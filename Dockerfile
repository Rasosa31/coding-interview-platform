# Use Node.js LTS as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install root dependencies
RUN npm install

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install

# Build frontend
RUN npm run build

# Copy application files
WORKDIR /app
COPY backend ./backend
COPY frontend/dist ./frontend/dist
COPY frontend/index.html ./frontend/

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the application
WORKDIR /app/backend
CMD ["node", "server.js"]


