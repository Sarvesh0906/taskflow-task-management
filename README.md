# **Taskflow — Scalable Task Management Web App**

Taskflow is a simple, fast, and responsive task-management app built for a 3-day assignment. It brings together a modern frontend, a lightweight backend, secure JWT authentication, and an easy-to-use dashboard designed with scalability in mind.

## 🌟 **Overview**

Taskflow allows users to create, view, update, and manage their tasks easily. The project shows how the frontend (React/Next.js) and backend (Node/Express) work smoothly together, with secure login/signup and a well-organized structure that can grow into a production-level application.

---

## 🚀 **Features**

### **Frontend (React/Next.js)**

* Responsive UI crafted with TailwindCSS
* Clean, accessible layout that adapts gracefully across screens
* Client-side & server-side form validation
* Protected routes for authenticated users
* Search and filter capabilities within the dashboard
* Logout flow that cleanly clears auth state

### **Backend (Node.js + Express)**

* Lightweight REST API with modular routing
* JWT-based authentication (login/signup)
* Password hashing with bcrypt
* Protected endpoints via JWT middleware
* CRUD routes for tasks
* User profile fetch/update APIs
* Centralized error handling & request validation

### **Database**

* Supabase models with clean schema definitions

---

## 🧭 **Dashboard Features**

* Authenticated access
* User profile display (fetched from backend)
* Add, edit, delete, and view tasks
* Search and filtering to quickly navigate through tasks

---

## 🔐 **Security**

* Hashed passwords (bcrypt)
* JWT signing & verification
* Secure middleware for protected routes
* Validation for request bodies
* Organized environment variable handling

---

## 🧱 **Tech Stack**

### **Frontend**

* React.js / Next.js
* TailwindCSS
* React Hooks & Context

### **Backend**

* Node.js
* Express.js
* JSON Web Tokens (JWT)
* Supabase

---

### **Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

Frontend will boot on your local dev port.

---

## 📬 **API Documentation**

A Postman collection (or API docs file) is included in the repository for easy testing of authentication, profile actions, and CRUD operations.

Endpoints include:

* `/api/auth/signup`
* `/api/auth/login`
* `/api/users/profile`
* `/api/tasks/` (CRUD)

---

## 📈 **Scalability Notes**

Taskflow is structured with a scaling mindset:

* Frontend separates UI logic, API logic, shared state, and components
* Backend adopts controller-service-model patterns for modularity
* Middlewares are isolated for future additions like rate limiting
* Environment configuration supports multi-environment deployment
* API routes are organized for easy versioning (ex: `/api/v1/...`)
* Deployment-ready with minimal adjustments

Future Scalability Options:

* Move to microservices or serverless functions
* Add caching (Redis), logging pipeline, rate limiting
* Integrate CI/CD for automated deployment
* Add role-based access control

---

## 🎯 **Deliverables Summary**

* Fully functional frontend + backend in this repository
* JWT-based authentication & logout
* Dashboard with CRUD operations
* Architecture designed for real-world scaling

---
