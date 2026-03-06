# Full Stack Notes App – Backend Plan

## Goal

Convert the existing **frontend Notes App (React + TypeScript + Tailwind)** into a **Full Stack application** using:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## 1. Project Architecture

```
Frontend  →  React App
Backend   →  Express API
Database  →  MongoDB
```

**Flow:**

```
User → React UI → API Request → Express Server → MongoDB
```

---

## 2. Backend Setup

### Create Backend Folder

```
notes-app/
├── frontend/
└── backend/
```

### Initialize Node Project

```bash
cd backend
npm init -y
```

Install dependencies:

```bash
npm install express mongoose cors dotenv bcrypt jsonwebtoken
npm install nodemon --save-dev
```

---

## 3. Backend Folder Structure

```
backend/
│
├── config/
│   └── db.js
│
├── models/
│   ├── User.js
│   └── Note.js
│
├── routes/
│   ├── authRoutes.js
│   └── noteRoutes.js
│
├── controllers/
│   ├── authController.js
│   └── noteController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── server.js
└── .env
```

**Purpose of each folder:**

| Folder | Purpose |
|---|---|
| `config/` | Database connection |
| `models/` | MongoDB schemas |
| `routes/` | API route definitions |
| `controllers/` | Logic for API endpoints |
| `middleware/` | Authentication middleware |
| `server.js` | Entry point of backend |

---

## 4. Database Design

### User Model

Fields:
- `name`
- `email`
- `password`
- `createdAt`

### Note Model

Fields:
- `title`
- `content`
- `userId`
- `createdAt`
- `updatedAt`

> `userId` connects notes to a specific user.

---

## 5. Authentication System

Use:
- **bcrypt** → password hashing
- **jsonwebtoken (JWT)** → user authentication

**Flow:**

```
Register → hash password → save user
Login    → verify password → return JWT token
```

Token is sent in requests:

```
Authorization: Bearer <token>
```

---

## 6. API Endpoints

### Auth Routes

#### Register User

`POST /auth/register`

Request body:

```json
{
  "name": "John",
  "email": "john@email.com",
  "password": "123456"
}
```

#### Login User

`POST /auth/login`

Returns:

```json
{
  "token": "JWT_TOKEN"
}
```

---

## 7. Notes API

> All note routes require authentication.

### Get All Notes

`GET /notes`

Returns all notes of the logged-in user.

### Create Note

`POST /notes`

```json
{
  "title": "New Note",
  "content": "Learning backend"
}
```

### Update Note

`PUT /notes/:id`

Updates note content.

### Delete Note

`DELETE /notes/:id`

Deletes a note.

---

## 8. Middleware

Create authentication middleware.

**Purpose:**
- Verify JWT token
- Extract user ID
- Allow access to protected routes

**Used in:** `/notes` routes

---

## 9. Frontend Integration

Frontend sends requests to the backend API.

#### Login request:

```
POST http://localhost:5000/auth/login
```

#### Store token:

```js
localStorage.setItem("token", token)
```

#### Send token in future requests:

```
Authorization: Bearer token
```

#### Example routes:

```
GET    /notes
POST   /notes
PUT    /notes/:id
DELETE /notes/:id
```

---

## 10. Development Steps

### Step 1 — Setup Backend Project
- Initialize Node
- Install packages
- Create `server.js`

### Step 2 — Connect MongoDB
- Create database connection
- Test connection

### Step 3 — Create Models
- User model
- Note model

### Step 4 — Implement Authentication
- Register route
- Login route
- Password hashing
- JWT generation

### Step 5 — Create Auth Middleware
- Verify JWT
- Attach user to request

### Step 6 — Implement Notes API
- Create note
- Get notes
- Update note
- Delete note

### Step 7 — Connect Frontend
- Replace localStorage logic
- Call backend APIs
- Store JWT token

---

## 11. Optional Improvements

After the basic version works:

- [ ] Search notes
- [ ] Tags
- [ ] Pin notes
- [ ] Markdown editor
- [ ] Autosave
- [ ] Note categories

---

## 12. Resume Project Title

**Full Stack Notes Management Application**

**Technologies:**

| Frontend | Backend | Database | Auth |
|---|---|---|---|
| React | Node.js | MongoDB | JWT |
| TypeScript | Express.js | | |
| TailwindCSS | | | |