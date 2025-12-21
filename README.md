# 🔐 SecureProfile - Secure User Profile System


## 📋 Project Overview

**SecureProfile** is a comprehensive **Secure User Profile & Access Control System** developed as part of the LenDenClub assignment. This full-stack application demonstrates enterprise-level security practices for user authentication, authorization, and sensitive data management.

### 🎯 Implementation Approach

The system implements a **zero-trust security architecture** where:
- All sensitive data is **encrypted at rest** using AES-256 encryption
- User passwords are **hashed** using bcrypt
- **JWT-based stateless authentication** ensures secure API access
- Sensitive information is **decrypted only on the backend** for authorized requests
- Environment variables protect all secrets and encryption keys

---

## 🛠️ Tech Stack

### Frontend 🎨

- **React.js 18+** - UI library with hooks
- **Vite** - Lightning-fast build tool
- **React Router DOM v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with CSS variables

### Backend ⚙️

- **Node.js 18+** - JavaScript runtime
- **Express.js 4.x** - Web application framework
- **JWT (jsonwebtoken)** - Stateless authentication
- **bcryptjs** - Password hashing algorithm
- **crypto (native)** - AES-256 encryption
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Database 🗄️

- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **Mongoose** - ODM (Object Data Modeling) library

### Development Tools 🔧

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control
- **Postman** - API testing

---

## 🚀 Setup & Run Instructions

### Prerequisites 📦

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download here](https://git-scm.com/)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/Secure-User-Profile-System.git
cd Secure-User-Profile-System
```

### 2️⃣ Backend Setup

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the backend root directory:**
   ```bash
   touch .env
   ```

4. **Add the following environment variables to `.env`:**
   ```env
   # Server Configuration
   PORT=5000
   
   # MongoDB Connection
   MONGO_URI=your_mongodb_atlas_connection_string
   
   # JWT Secret (Use a strong random string)
   JWT_SECRET=your_super_secure_jwt_secret_key_here
   
   # AES-256 Encryption Key (Must be 32 characters)
   ENCRYPTION_KEY=your_32_character_encryption_key
   ```

   **Important Notes:**
   - Replace `your_mongodb_atlas_connection_string` with your actual MongoDB Atlas URI
   - Generate a strong JWT_SECRET (recommended: 64+ random characters)
   - ENCRYPTION_KEY must be exactly 32 characters for AES-256

5. **Generate secure keys (Optional helper):**
   ```bash
   node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
   node -e "console.log('ENCRYPTION_KEY=' + require('crypto').randomBytes(16).toString('hex'))"
   ```

6. **Start the backend server:**
   ```bash
   npm start
   ```
   
   The backend will run on `http://localhost:5000`

   **For development with auto-reload:**
   ```bash
   npm run dev
   ```

### 3️⃣ Frontend Setup

1. **Open a new terminal and navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the frontend root directory:**
   ```bash
   touch .env
   ```

4. **Add the backend API URL to `.env`:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will run on `http://localhost:5173`

6. **Open your browser and navigate to:**
   ```
   http://localhost:5173
   ```


---

## 📚 API Documentation

Base URL: `http://localhost:5000/api`

### Authentication Endpoints 🔑

#### 1. Register User

**Endpoint:** `POST /auth/register`

**Description:** Creates a new user account with encrypted sensitive data.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123!",
  "aadhaar": "1234-5678-9012"
}
```

**Response (Success - 201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "674a5b1c8e9f1234567890ab",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2025-12-21T10:30:00.000Z"
  }
}
```

**Response (Error - 400):**
```json
{
  "error": "User already exists"
}
```

**Validation Rules:**
- `name`: Required, string, min 2 characters
- `email`: Required, valid email format, unique
- `password`: Required, min 6 characters
- `aadhaar`: Required, string

---

#### 2. Login User

**Endpoint:** `POST /auth/login`

**Description:** Authenticates user and returns JWT token.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Response (Success - 200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "674a5b1c8e9f1234567890ab",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

**Response (Error - 401):**
```json
{
  "error": "Invalid credentials"
}
```

**Token Usage:**
- Store the token in localStorage/sessionStorage
- Include in Authorization header: `Bearer <token>`
- Token expires in 24 hours

---

### User Endpoints 👤

#### 3. Get User Profile

**Endpoint:** `GET /user/profile`

**Description:** Retrieves authenticated user's profile with decrypted sensitive data.

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (Success - 200):**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "aadhaar": "1234-5678-9012",
  "createdAt": "2025-12-21T10:30:00.000Z",
  "updatedAt": "2025-12-21T10:30:00.000Z"
}
```

**Response (Error - 401):**
```json
{
  "error": "Unauthorized - Invalid token"
}
```

**Response (Error - 404):**
```json
{
  "error": "User not found"
}
```

---

## 🗃️ Database Schema

### User Collection

**Collection Name:** `users`

| Field | Type | Description | Encrypted | Indexed |
|-------|------|-------------|-----------|---------|
| `_id` | ObjectId | Auto-generated MongoDB ID | ❌ | ✅ Primary |
| `name` | String | User's full name | ❌ | ❌ |
| `email` | String | User's email address | ❌ | ✅ Unique |
| `password` | String | Hashed password (bcrypt) | ✅ | ❌ |
| `aadhaar` | String | Encrypted Aadhaar/ID number | ✅ | ❌ |
| `createdAt` | Date | Account creation timestamp | ❌ | ❌ |
| `updatedAt` | Date | Last update timestamp | ❌ | ❌ |

**Visual Representation:**

```
┌─────────────────────────────────────────────┐
│              users Collection               │
├─────────────────────────────────────────────┤
│ _id         : ObjectId (Primary Key)        │
│ name        : String (Plain Text)           │
│ email       : String (Unique, Indexed)      │
│ password    : String (Bcrypt Hash)          │
│ aadhaar     : String (AES-256 Encrypted)    │
│ createdAt   : Date (Auto-generated)         │
│ updatedAt   : Date (Auto-updated)           │
└─────────────────────────────────────────────┘
```
---

## 🤖 AI Tool Usage & Development Tasks

### 🤖 AI Tool Usage Summary

Throughout this project, **ChatGPT** was used to improve development speed, code quality, and documentation clarity. AI assistance was primarily focused on reducing boilerplate work, implementing security features, structuring frontend components, and supporting debugging.

**Key areas where AI assistance was used:**

| Area | Contribution |
|-----|-------------|
| Project Setup | Generated initial folder structure and configuration for frontend and backend |
| Database Design | Created MongoDB user schema with validation and timestamps |
| Security | Implemented AES-256 encryption, bcrypt password hashing, and JWT authentication |
| Backend Logic | Assisted in writing authentication controllers, middleware, and route handling |
| Frontend Development | Generated Login, Register, and Profile components with API integration |
| UI & Styling | Helped design centered layouts and apply a consistent cappuccino mocha theme |
| API Integration | Configured Axios, handled errors, and managed authentication headers |
| Debugging | Assisted in identifying and resolving integration and runtime issues |
| Documentation | Drafted and structured the README and setup instructions |

---

### 🎯 Effectiveness Score: **4 / 5**

Using ChatGPT significantly improved development efficiency by reducing boilerplate work for authentication, encryption utilities, API structure, and frontend scaffolding. It saved several hours during setup and documentation. Some AI-generated code required manual debugging and refinement during frontend–backend integration and encryption testing, which slightly reduced overall efficiency.

---

## 🚀 Deployment

### Backend Deployment (Render)

1. Create account on Render
2. Connect GitHub repository
3. Add environment variables in dashboard
4. Deploy backend service
5. Note the backend URL

### Frontend Deployment (Vercel/Netlify)

1. Create account on Vercel or Netlify
2. Connect GitHub repository
3. Add environment variable: `VITE_API_URL=<backend_url>/api`
4. Deploy frontend
5. Test the deployed application

---

<div align="center">

**⭐ Star this repository if you found it helpful! ⭐**

</div>
