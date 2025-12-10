# Coding Interview Platform

A real-time collaborative coding interview platform built with React, Express.js, and Socket.io. This application allows interviewers to create coding sessions and share them with candidates, enabling real-time code editing and execution.

## Features

- ✅ Create and share interview sessions via unique links
- ✅ Real-time collaborative code editing
- ✅ Syntax highlighting for JavaScript and Python
- ✅ Safe code execution in the browser using WASM (Pyodide for Python)
- ✅ Multi-user support with live updates

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Express.js
- **Real-time Communication**: Socket.io
- **Code Editor**: CodeMirror 6
- **Code Execution**: 
  - JavaScript: Native browser execution
  - Python: Pyodide (WASM)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd coding-interview-platform
```

2. Install all dependencies:
```bash
npm run install:all
```

Or install manually:
```bash
# Root dependencies
npm install

# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

## Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3000`
- Frontend development server on `http://localhost:5173`

### Run Separately

Backend only:
```bash
npm run dev:backend
```

Frontend only:
```bash
npm run dev:frontend
```

## Testing

Run integration tests:
```bash
npm test
```

Or from the backend directory:
```bash
cd backend
npm test
```

## Usage

1. Start the application using `npm run dev`
2. Open `http://localhost:5173` in your browser
3. Click "Create New Session" to create a new interview session
4. Copy the Session ID or shareable link
5. Share the link with candidates
6. Both interviewer and candidate can edit code in real-time
7. Select the programming language (JavaScript or Python)
8. Click "Run Code" to execute the code safely in the browser

## Project Structure

```
coding-interview-platform/
├── backend/
│   ├── server.js          # Express server with Socket.io
│   ├── package.json
│   └── tests/
│       └── integration.test.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CodeEditor.jsx
│   │   │   ├── CodeExecutor.jsx
│   │   │   └── SessionManager.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── package.json
└── README.md
```

## API Endpoints

### POST /api/sessions
Create a new interview session.

**Response:**
```json
{
  "sessionId": "uuid-string"
}
```

### GET /api/sessions/:sessionId
Get session information.

**Response:**
```json
{
  "code": "current code",
  "language": "javascript"
}
```

## WebSocket Events

### Client → Server
- `join-session`: Join a session with sessionId
- `code-change`: Broadcast code changes
- `language-change`: Change programming language

### Server → Client
- `code-update`: Receive code updates from other users
- `language-update`: Receive language changes
- `error`: Error messages

## Docker

Build the Docker image:
```bash
docker build -t coding-interview-platform .
```

Run the container:
```bash
docker run -p 3000:3000 coding-interview-platform
```

## Deployment

The application can be deployed to various platforms:
- Heroku
- Railway
- Render
- Vercel (frontend) + Railway/Render (backend)
- AWS/GCP/Azure

Make sure to set the appropriate environment variables for production.

## License

MIT


