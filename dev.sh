#!/bin/bash

echo "🚀 Starting ScrumForge development environment..."

# 1) Start the database container in the background
echo "🐘 Starting PostgreSQL (Docker)..."
docker compose up -d db

# Wait a moment for PostgreSQL to be fully ready
sleep 2

# 2) Start backend in development mode
echo "⚙️  Starting backend API..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# 3) Start the pgadmin container in the background
echo "🐘 Starting pgAdmin (Docker)..."
docker compose up -d pgadmin

# 4) Start frontend in development mode
echo "🎨 Starting frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ ScrumForge is now running!"
echo "--------------------------------------"
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 Backend : http://localhost:4020"
echo "🔌 pgAdmin : http://localhost:5050"
echo "🐘 Database: localhost:5440"
echo "--------------------------------------"
echo ""
echo "Press CTRL+C to stop everything."
echo ""

# Keep script running until user stops it
wait
