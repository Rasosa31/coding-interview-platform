import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { io as ioClient } from 'socket.io-client';
import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const serverIo = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const sessions = new Map();

app.post('/api/sessions', (req, res) => {
  const sessionId = uuidv4();
  sessions.set(sessionId, {
    code: '',
    language: 'javascript',
    users: new Set()
  });
  res.json({ sessionId });
});

app.get('/api/sessions/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const session = sessions.get(sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  res.json({
    code: session.code,
    language: session.language
  });
});

serverIo.on('connection', (socket) => {
  socket.on('join-session', (sessionId) => {
    const session = sessions.get(sessionId);
    if (!session) {
      socket.emit('error', { message: 'Session not found' });
      return;
    }
    socket.join(sessionId);
    session.users.add(socket.id);
    socket.emit('code-update', {
      code: session.code,
      language: session.language
    });
  });

  socket.on('code-change', ({ sessionId, code, language }) => {
    const session = sessions.get(sessionId);
    if (!session) return;
    session.code = code;
    if (language) session.language = language;
    socket.to(sessionId).emit('code-update', {
      code,
      language: session.language
    });
  });

  socket.on('disconnect', () => {
    for (const [sessionId, session] of sessions.entries()) {
      if (session.users.has(socket.id)) {
        session.users.delete(socket.id);
      }
    }
  });
});

describe('Integration Tests', () => {
  beforeAll((done) => {
    httpServer.listen(3001, () => {
      done();
    });
  });

  afterAll((done) => {
    serverIo.close();
    httpServer.close(done);
  });

  it('should create a new session', async () => {
    const response = await request(app)
      .post('/api/sessions')
      .expect(200);

    expect(response.body).toHaveProperty('sessionId');
    expect(response.body.sessionId).toBeTruthy();
  });

  it('should get session info', async () => {
    const createResponse = await request(app)
      .post('/api/sessions')
      .expect(200);

    const sessionId = createResponse.body.sessionId;

    const getResponse = await request(app)
      .get(`/api/sessions/${sessionId}`)
      .expect(200);

    expect(getResponse.body).toHaveProperty('code');
    expect(getResponse.body).toHaveProperty('language');
    expect(getResponse.body.language).toBe('javascript');
  });

  it('should return 404 for non-existent session', async () => {
    await request(app)
      .get('/api/sessions/non-existent-id')
      .expect(404);
  });

  it('should handle WebSocket connection and join session', (done) => {
    request(app)
      .post('/api/sessions')
      .expect(200)
      .then((response) => {
        const sessionId = response.body.sessionId;

        const clientSocket = ioClient('http://localhost:3001');

        clientSocket.on('connect', () => {
          clientSocket.emit('join-session', sessionId);

          clientSocket.on('code-update', (data) => {
            expect(data).toHaveProperty('code');
            expect(data).toHaveProperty('language');
            clientSocket.close();
            done();
          });
        });
      });
  });

  it('should broadcast code changes to other clients', (done) => {
    request(app)
      .post('/api/sessions')
      .expect(200)
      .then((response) => {
        const sessionId = response.body.sessionId;

        const client1 = ioClient('http://localhost:3001');
        const client2 = ioClient('http://localhost:3001');

        let bothConnected = false;

        const checkAndTest = () => {
          if (bothConnected) return;
          bothConnected = true;

          client1.emit('join-session', sessionId);
          client2.emit('join-session', sessionId);

          client2.on('code-update', (data) => {
            if (data.code === 'console.log("Hello");') {
              client1.close();
              client2.close();
              done();
            }
          });

          setTimeout(() => {
            client1.emit('code-change', {
              sessionId,
              code: 'console.log("Hello");',
              language: 'javascript'
            });
          }, 200);
        };

        client1.on('connect', checkAndTest);
        client2.on('connect', checkAndTest);
      });
  });
});
