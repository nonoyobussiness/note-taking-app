# Backend (Express + MongoDB + JWT)

This backend stores user accounts and notes so every user gets their own notes after logging in.

## 1) Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` with your MongoDB URI and JWT secret.

## 2) Run

```bash
npm run dev
```

Server runs on `http://localhost:5000` by default.

## 3) API

### Auth
- `POST /auth/register` → `{ email, password }`
- `POST /auth/login` → `{ email, password }` returns `{ token }`

### Notes (requires `Authorization: Bearer <token>`)
- `GET /api/notes`
- `POST /api/notes`
- `PATCH /api/notes/:id`
- `DELETE /api/notes/:id`

## 4) Data model

- `User`: `email`, `passwordHash`
- `Note`: `owner`, `title`, `content`, `tags[]`, `isArchived`, timestamps
