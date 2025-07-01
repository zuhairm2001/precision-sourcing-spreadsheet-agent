# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a precision sourcing spreadsheet agent application with a full-stack architecture:

- **Backend**: FastAPI server with LangChain OpenAI agent for CSV/spreadsheet analysis
- **Frontend**: Next.js React chat interface with TypeScript and Tailwind CSS
- **Database**: SQLite for chat history persistence
- **AI Integration**: OpenAI GPT-4o model via LangChain with pandas dataframe agent

## Architecture

The application follows a clear separation of concerns:

### Backend Structure (`/backend`)
- `main.py`: FastAPI application with CORS setup and two main routes (`/chat`, `/get`)
- `spreadsheet_agent.py`: Core `SpreadsheetAgent` class that initializes pandas dataframe agent with OpenAI
- `service/agent_service.py`: Service layer handling chat response generation and history retrieval
- `schemas/chat_schemas.py`: Pydantic models for API request/response validation
- `utility/db_init.py`: SQLite database initialization and table creation utilities

### Frontend Structure (`/frontend`)
- `app/page.tsx`: Main chat interface component with message handling and API integration
- `components/chat/`: Modular chat components (header, messages, input, loading)
- `components/ui/`: Reusable UI components using Radix UI and Tailwind
- `app/types.ts`: TypeScript type definitions for chat messages and API responses

### Key Integration Points
- Backend loads CSV from `SPREADSHEET_URL` environment variable into pandas DataFrame
- LangChain agent uses `allow_dangerous_code=True` for DataFrame operations
- Chat history stored in SQLite with user/agent messages and timestamps
- Frontend fetches chat history on load and sends new messages to `/chat` endpoint

## Development Commands

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python utility/db_init.py  # Initialize SQLite database
uvicorn main:app --reload  # Start development server on port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev  # Start development server on port 3000
npm run build  # Production build
npm run lint  # TypeScript and ESLint checks
```

## Environment Configuration

Required `.env` file in project root:
```
OPENAI_API_KEY=your_openai_api_key
SPREADSHEET_URL=path_to_your_csv_file
```

## Database Schema

SQLite table `messages`:
- `id`: Auto-incrementing primary key
- `user_message`: TEXT - User's input message
- `agent_message`: TEXT - AI agent's response
- `user_timestamp`: DATETIME - When user sent message
- `agent_timestamp`: DATETIME - When agent responded

## API Endpoints

- `POST /chat`: Send message to agent, returns `ChatResponse`
- `GET /get`: Retrieve chat history, returns `ChatHistoryList`
- `GET /`: Serves the built React frontend (when running in Docker)

Both endpoints have corresponding Pydantic schemas in `schemas/chat_schemas.py`.

## Docker Deployment

### Building and Running
```bash
# Build the Docker image with build arguments
docker build -t spreadsheet-agent \
  --build-arg OPENAI_API_KEY=your_openai_key \
  --build-arg SPREADSHEET_URL=your_csv_path \
  .

# Run the container
docker run -p 8000:8000 spreadsheet-agent

# Or use docker-compose (set environment variables in .env file)
docker-compose up --build
```

The Docker image includes both frontend and backend in a single container:
- Frontend is built as static files and served by FastAPI
- Backend runs on port 8000 with all API endpoints
- Access the application at http://localhost:8000