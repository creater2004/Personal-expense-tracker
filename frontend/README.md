# Personal Expense Tracker — Frontend

React + Vite frontend for the Personal Expense Tracker backend.

## Requirements
- Node.js LTS
- Backend running at `http://localhost:5000`
- MongoDB connected through the backend

## Setup
```bash
npm install
```

Optional: copy `.env.example` to `.env` and set `VITE_API_URL`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

Open the URL Vite prints, normally `http://localhost:5173`.

## Pages
- `/register`
- `/login`
- `/dashboard`
- `/expenses`
- `/expenses/add`
- `/expenses/:id/edit`

The frontend expects the backend routes in the companion backend project. Protected API requests automatically include the stored JWT as a Bearer token.
