import React, { useState } from 'react';
import './SessionManager.css';

function SessionManager({ sessionId, onCreateSession, onJoinSession }) {
  const [joinSessionId, setJoinSessionId] = useState('');

  const handleJoin = (e) => {
    e.preventDefault();
    if (joinSessionId.trim()) {
      onJoinSession(joinSessionId.trim());
      setJoinSessionId('');
    }
  };

  return (
    <div className="session-manager">
      {!sessionId ? (
        <div className="session-actions">
          <button onClick={onCreateSession} className="btn btn-primary">
            Create New Session
          </button>
          <div className="divider">or</div>
          <form onSubmit={handleJoin} className="join-form">
            <input
              type="text"
              placeholder="Enter Session ID"
              value={joinSessionId}
              onChange={(e) => setJoinSessionId(e.target.value)}
              className="session-input"
            />
            <button type="submit" className="btn btn-secondary">
              Join Session
            </button>
          </form>
        </div>
      ) : (
        <div className="session-info">
          <div className="session-id-display">
            <span className="label">Session ID:</span>
            <span className="session-id">{sessionId}</span>
            <button
              onClick={() => navigator.clipboard.writeText(sessionId)}
              className="btn-copy"
              title="Copy to clipboard"
            >
              📋
            </button>
            <button
              onClick={() => {
                const url = `${window.location.origin}?session=${sessionId}`;
                navigator.clipboard.writeText(url);
                alert('Link copied to clipboard!');
              }}
              className="btn-copy"
              title="Copy shareable link"
            >
              🔗
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SessionManager;


