# Multi-stage Dockerfile for Frontend + Backend

# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Final Image with Backend + Built Frontend
FROM python:3.12-slim

# Define build arguments
ARG OPENAI_API_KEY
ARG SPREADSHEET_URL

# Set environment variables from build args
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV SPREADSHEET_URL=${SPREADSHEET_URL}

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./

# Copy built frontend from previous stage
COPY --from=frontend-builder /app/frontend/out ./static

# Initialize database
RUN python utility/db_init.py

# Expose port
EXPOSE 8000

# Start the FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]