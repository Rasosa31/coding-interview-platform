import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import CodeEditor from './components/CodeEditor';
import SessionManager from './components/SessionManager';
import CodeExecutor from './components/CodeExecutor';
import './App.css';

// Use current origin in production, localhost in development
const API_URL = import.meta.env.PROD 
  ? window.location.origin 
  : 'http://localhost:3000';

const socket = io(API_URL);

function App() {
  const [sessionId, setSessionId] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check for session ID in URL
    const urlParams = new URLSearchParams(window.location.search);
    const sessionParam = urlParams.get('session');
    if (sessionParam) {
      joinSession(sessionParam);
    }

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('code-update', ({ code: newCode, language: newLanguage }) => {
      setCode(newCode);
      if (newLanguage) {
        setLanguage(newLanguage);
      }
    });

    socket.on('language-update', ({ language: newLanguage }) => {
      setLanguage(newLanguage);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('code-update');
      socket.off('language-update');
    };
  }, []);

  const createSession = async () => {
    try {
      const response = await fetch(`${API_URL}/api/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setSessionId(data.sessionId);
      socket.emit('join-session', data.sessionId);
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const joinSession = (id) => {
    if (id && id.trim()) {
      setSessionId(id.trim());
      if (socket.connected) {
        socket.emit('join-session', id.trim());
      } else {
        socket.once('connect', () => {
          socket.emit('join-session', id.trim());
        });
      }
    }
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (sessionId) {
      socket.emit('code-change', {
        sessionId,
        code: newCode,
        language
      });
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (sessionId) {
      socket.emit('language-change', {
        sessionId,
        language: newLanguage
      });
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Coding Interview Platform</h1>
        <div className="connection-status">
          <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></span>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </header>

      <SessionManager
        sessionId={sessionId}
        onCreateSession={createSession}
        onJoinSession={joinSession}
      />

      {sessionId && (
        <div className="main-content">
          <div className="editor-section">
            <CodeEditor
              code={code}
              language={language}
              onCodeChange={handleCodeChange}
              onLanguageChange={handleLanguageChange}
            />
          </div>
          <div className="executor-section">
            <CodeExecutor code={code} language={language} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

