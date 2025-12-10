import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || true  // Allow all origins in production, or specific URL
    : "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
};

const io = new Server(httpServer, {
  cors: corsOptions
});

app.use(cors(corsOptions));
app.use(express.json());

// Store sessions: roomId -> { code, language, users }
const sessions = new Map();

// Create a new interview session
app.post('/api/sessions', (req, res) => {
  const sessionId = uuidv4();
  sessions.set(sessionId, {
    code: '',
    language: 'javascript',
    users: new Set()
  });
  res.json({ sessionId });
});

// Get session info
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

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-session', (sessionId) => {
    const session = sessions.get(sessionId);
    if (!session) {
      socket.emit('error', { message: 'Session not found' });
      return;
    }

    socket.join(sessionId);
    session.users.add(socket.id);
    
    // Send current code state to the new user
    socket.emit('code-update', {
      code: session.code,
      language: session.language
    });

    // Notify others about new user
    socket.to(sessionId).emit('user-joined', { userId: socket.id });
  });

  socket.on('code-change', ({ sessionId, code, language }) => {
    const session = sessions.get(sessionId);
    if (!session) {
      return;
    }

    session.code = code;
    if (language) {
      session.language = language;
    }

    // Broadcast to all other users in the session
    socket.to(sessionId).emit('code-update', {
      code,
      language: session.language
    });
  });

  socket.on('language-change', ({ sessionId, language }) => {
    const session = sessions.get(sessionId);
    if (!session) {
      return;
    }

    session.language = language;
    socket.to(sessionId).emit('language-update', { language });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Remove user from all sessions
    for (const [sessionId, session] of sessions.entries()) {
      if (session.users.has(socket.id)) {
        session.users.delete(socket.id);
        socket.to(sessionId).emit('user-left', { userId: socket.id });
      }
    }
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/dist/index.html'));
  });
}

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

