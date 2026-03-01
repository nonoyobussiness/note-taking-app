# Note Taking App (Frontend + Backend)

This project now includes:
- A Vite + React frontend
- An Express + MongoDB backend with JWT auth

## Frontend

```bash
npm install
npm run dev
```

Vite runs on `http://localhost:5173`.

## Backend

See [`backend/README.md`](backend/README.md) for full backend setup.

Quick start:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on `http://localhost:5000`.

## How persistence works

1. User registers/login via `/auth/register` and `/auth/login`.
2. Backend returns a JWT token on login.
3. Frontend stores JWT in `localStorage`.
4. Frontend sends the token in `Authorization: Bearer <token>` when calling `/api/notes`.
5. Backend stores each note with an `owner` field, so users only see their own notes.
