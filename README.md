<div align="center">

# 🚀 Task Management API

A professional Task Management API built with a FastAPI backend and a connected frontend interface — letting users securely manage tasks through authentication, CRUD operations, database integration, and a clean RESTful architecture.

`🐍 Python` &nbsp; `⚡ FastAPI` &nbsp; `🗄 MySQL` &nbsp; `🔐 JWT Authentication` &nbsp; `🧩 SQLAlchemy` &nbsp; `✅ Pydantic` &nbsp; `🌐 Frontend Application` &nbsp; `📜 MIT License`

</div>

---

## 📌 Project Overview

- **What it does** — The Task Management API lets registered users create, view, update, and delete their own tasks through a secure, authenticated backend.
- **Why it was built** — Created to demonstrate real-world backend engineering: authentication systems, database-driven design, and full-stack integration in one working project.
- **How users interact** — Users register and log in through the frontend dashboard, then manage their tasks through a simple, authenticated interface backed by the API.
- **Backend + frontend integration** — The frontend communicates with the FastAPI backend over HTTP, sending authenticated requests and rendering the returned task data.
- **REST API architecture** — Every action in the app — auth, task creation, updates, deletion — is exposed as a clean, predictable REST endpoint.
- **Database-driven** — All user accounts and tasks are persisted in a MySQL database through SQLAlchemy models, keeping data consistent and relational.

<div align="center">
  <img src="Images/02_Frontend_dashboard_overview.png" alt="Application dashboard showing the task management interface" width="800">
  <br>
  <em>Application dashboard showing the task management interface.</em>
</div>

---

## ⚙️ Features

### 🔐 Authentication
- User registration
- User login
- JWT based authentication
- Protected routes

### 📝 Task Management
- Create tasks
- View tasks
- Update tasks
- Delete tasks

### 🗄 Database Management
- User data storage
- Task data storage
- Database relationships

### 📚 API Documentation
- Swagger UI
- API testing

### 🎨 Frontend Interface
- User-friendly dashboard
- Task interaction

---

## 🏗 Tech Stack

| Category | Technologies |
|---|---|
| **Backend** | Python, FastAPI, Uvicorn |
| **Database** | MySQL |
| **ORM** | SQLAlchemy |
| **Validation** | Pydantic |
| **Authentication** | JWT, OAuth2 |
| **Frontend** | React 18 ,  Vite , Tailwind ,  CSS ,  JavaScript (JSX) |
| **Tools** | Git, GitHub, VS Code |

---

## 📂 Project Structure

```
task-management-API/
├── backend/
├── frontend/
├── Images/
│   ├── 01_Frontend_login_page.png
│   ├── 02_Frontend_dashboard_overview.png
│   ├── 03_FastAPI_Swagger_UI.png
│   ├── 04_console_preview_backend.png
│   ├── 05_console_preview_frontend.png
│   └── 06_database_schemas.png
└── .gitignore
```

---

## 🚀 Installation & Setup

**1. Clone the repository**
```bash
git clone https://github.com/abdullahamin-ai/task-management-API.git
cd task-management-API
```

**2. Create a virtual environment**
```bash
python -m venv venv
venv\Scripts\activate      # Windows
source venv/bin/activate   # Mac / Linux
```

**3. Install backend dependencies**
```bash
cd backend
pip install -r requirements.txt
```

**4. Configure environment variables**
```env
DATABASE_URL=mysql+pymysql://user:password@localhost/db_name
SECRET_KEY=your_secret_key
ALGORITHM=HS256
```

**5. Set up the database**
```sql
mysql -u root -p
CREATE DATABASE db_name;
```

**6. Start the backend server**
```bash
uvicorn main:app --reload
```

<div align="center">
  <img src="Images/04_console_preview_backend.png" alt="Backend server running successfully" width="700">
  <br>
  <em>Backend server running successfully.</em>
</div>

**7. Start the frontend application**
```bash
cd frontend
# run the frontend using its respective start command
```

<div align="center">
  <img src="Images/05_console_preview_frontend.png" alt="Frontend application running successfully" width="700">
  <br>
  <em>Frontend application running successfully.</em>
</div>

---

## 🔑 Authentication Flow

```
User Registration
        ↓
   User Login
        ↓
JWT Token Generated
        ↓
Authorization Header
        ↓
Protected API Access
```

When a user registers, their credentials are securely stored in the database. On login, the API verifies the credentials and issues a signed JWT token. This token is then sent with every subsequent request inside the `Authorization: Bearer <token>` header, allowing the API to verify the user's identity and grant access to protected task endpoints without requiring the user to log in again on every request.

<div align="center">
  <img src="Images/01_Frontend_login_page.png" alt="Login interface demonstrating user authentication" width="700">
  <br>
  <em>Login interface demonstrating user authentication.</em>
</div>

---

## 📘 API Documentation

FastAPI automatically generates interactive Swagger documentation for every endpoint, available at:

```
http://127.0.0.1:8000/docs
```

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register user |
| `POST` | `/auth/login` | Login user |
| `GET` | `/tasks` | Retrieve tasks |
| `POST` | `/tasks` | Create task |
| `PUT` | `/tasks/{id}` | Update task |
| `DELETE` | `/tasks/{id}` | Delete task |

<div align="center">
  <img src="Images/03_FastAPI_Swagger_UI.png" alt="FastAPI Swagger UI documentation and API testing interface" width="800">
  <br>
  <em>FastAPI Swagger UI documentation and API testing interface.</em>
</div>

---

## 🗄 Database Design

Data is modeled with SQLAlchemy across two related tables, keeping user accounts and their tasks properly connected.

**Users Table**
- User information
- Authentication details

**Tasks Table**
- Task information
- User relationship

<div align="center">
  <img src="Images/06_database_schemas.png" alt="MySQL database schema showing application tables" width="800">
  <br>
  <em>MySQL database schema showing application tables.</em>
</div>

---

## 🖥 Project Screenshots

<div align="center">

| Login Page | Dashboard | Swagger UI |
|---|---|---|
| <img src="Images/01_Frontend_login_page.png" width="250"> | <img src="Images/02_Frontend_dashboard_overview.png" width="250"> | <img src="Images/03_FastAPI_Swagger_UI.png" width="250"> |

| Backend Console | Frontend Console | Database Schema |
|---|---|---|
| <img src="Images/04_console_preview_backend.png" width="250"> | <img src="Images/05_console_preview_frontend.png" width="250"> | <img src="Images/06_database_schemas.png" width="250"> |

</div>

---

## 🔮 Future Improvements

- Task priorities
- Deadlines
- Notifications
- Docker support
- Cloud deployment
- Automated testing

---

## 📜 License

**MIT License © 2026 Abdullah Amin**

This project is licensed under the MIT License — meaning it can be freely used, copied, modified, and distributed, including for commercial purposes, as long as the original copyright notice is retained.

---

## 👨‍💻 Author

<div align="center">

**Abdullah Amin**

Backend Developer · Python · FastAPI · AI Enthusiast

</div>
