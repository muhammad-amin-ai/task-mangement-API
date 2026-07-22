# Task Management — Frontend

React + Vite + Tailwind CSS frontend for the Task Management API (FastAPI backend).

## Stack

React 18 · Vite · Tailwind CSS · Axios · React Router v6

## Getting started

```bash
npm install
cp .env.example .env      # point VITE_API_BASE_URL at your running backend
npm run dev                # http://localhost:5173
```

The backend is expected at `http://localhost:8000` by default (see `.env.example`). Start it with `uvicorn app.main:app --reload` before logging in.

### One backend change required: CORS

The backend project itself is not modified here, but a browser app on `http://localhost:5173` calling an API on `http://localhost:8000` needs CORS enabled on the FastAPI side. Add this to `app/main.py` (not included in this frontend delivery, since it touches backend code):

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Project structure

```
frontend/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env / .env.example
├── src/
│   ├── main.jsx                 # entry point, providers
│   ├── App.jsx                  # routes
│   ├── index.css                # Tailwind + base styles
│   ├── api/
│   │   ├── axiosClient.js       # base URL, Bearer interceptor, 401 handling
│   │   ├── authApi.js           # /auth/register, /auth/login
│   │   └── taskApi.js           # /tasks CRUD
│   ├── context/
│   │   └── AuthContext.jsx      # token state, login/register/logout
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useTasks.js          # task list state + CRUD actions
│   ├── routes/
│   │   ├── ProtectedRoute.jsx   # redirects to /login if unauthenticated
│   │   └── GuestRoute.jsx       # redirects to /dashboard if already logged in
│   ├── components/
│   │   ├── ui/                  # Button, Input, Textarea, Select, Badge, Alert, Spinner
│   │   ├── auth/AuthLayout.jsx  # split-screen branded auth shell
│   │   ├── layout/               # Sidebar, Topbar, DashboardLayout
│   │   └── tasks/                # TaskCard, TaskList, TaskFilterTabs, TaskFormModal,
│   │                              # DeleteConfirmModal, EmptyState
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── NotFoundPage.jsx
│   └── utils/
│       ├── tokenStorage.js      # localStorage + JWT payload decode
│       ├── constants.js         # status/priority option lists
│       └── formatDate.js
```

## How auth works

1. `POST /auth/login` is called with `application/x-www-form-urlencoded` body (`username`, `password`) — matching FastAPI's `OAuth2PasswordRequestForm` on the backend.
2. The returned `access_token` is stored in `localStorage` and decoded client-side (no verification, display only) to show the username in the sidebar.
3. `axiosClient` attaches `Authorization: Bearer <token>` to every request automatically.
4. Any `401` response clears the token and redirects to `/login`.
5. `ProtectedRoute` guards `/dashboard`; `GuestRoute` keeps a logged-in user off `/login` and `/register`.

## Design notes

- Task cards carry a colored left-edge stripe for priority (green/amber/red) — the same visual language used in the branded auth-panel preview, so the first screen a new user sees already looks like the product.
- Type: Space Grotesk for headings, Inter for UI text, JetBrains Mono for dates/metadata.
- Deleting another user's task, missing/expired tokens, and validation errors are all surfaced as inline `Alert` messages using the backend's actual error `detail` text.
