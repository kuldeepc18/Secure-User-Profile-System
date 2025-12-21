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

### 📮 Postman Collection

You can test all APIs using this Postman collection structure:

**Collection Name:** SecureProfile API

**Variables:**
- `base_url`: http://localhost:5000/api
- `token`: (Set after login)

**Folder 1: Authentication**
- Register User (POST)
- Login User (POST)

**Folder 2: User**
- Get Profile (GET) - Requires Authorization header

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

**Example Document (Stored in Database):**

```json
{
  "_id": "674a5b1c8e9f1234567890ab",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "$2a$10$abcdefghijklmnopqrstuv1234567890ABCDEFGHIJKLMNOPQRS",
  "aadhaar": "a3f7b8c9d1e2f4g5h6i7j8k9l0m1n2o3",
  "createdAt": "2025-12-21T10:30:00.000Z",
  "updatedAt": "2025-12-21T10:30:00.000Z",
  "__v": 0
}
```
---

## 🤖 AI Tool Usage & Documentation (MANDATORY)

### AI-Assisted Development Tasks

Throughout this project, **ChatGPT** was extensively used to accelerate development and improve code quality. Below are specific tasks where AI assistance was leveraged:

| # | Task Description | AI Tool Used | Specific Contribution |
|---|------------------|--------------|----------------------|
| 1 | **Initial Project Structure Setup** | ChatGPT | Generated folder structure, package.json configurations for both frontend and backend |
| 2 | **MongoDB Schema Design** | ChatGPT | Created User model with Mongoose schema including timestamps and validation rules |
| 3 | **AES-256 Encryption Implementation** | ChatGPT | Generated encrypt/decrypt utility functions using Node.js crypto module with IV handling |
| 4 | **JWT Middleware Development** | ChatGPT | Implemented authMiddleware.js with token extraction, verification, and error handling |
| 5 | **Bcrypt Password Hashing** | ChatGPT | Added password hashing in User model pre-save hook with proper salt rounds |
| 6 | **Authentication Controller Logic** | ChatGPT | Wrote register and login controllers with validation, error handling, and token generation |
| 7 | **Protected Route Implementation** | ChatGPT | Created ProtectedRoute component for React Router with authentication check |
| 8 | **Axios Configuration** | ChatGPT | Set up Axios instance with base URL, interceptors, and error handling |
| 9 | **React Login Form** | ChatGPT | Generated Login.jsx with form state management, validation, and submission handling |
| 10 | **React Register Form** | ChatGPT | Created Register.jsx with all input fields and form validation |
| 11 | **Profile Page Design** | ChatGPT | Built Profile.jsx with useEffect for data fetching and conditional rendering |
| 12 | **Catppuccin Theme Integration** | ChatGPT | Generated CSS variables for Mocha (dark) and Latte (light) themes with all color tokens |
| 13 | **Theme Context Implementation** | ChatGPT | Created ThemeContext.jsx with useState, useEffect, and localStorage persistence |
| 14 | **Navbar Component** | ChatGPT | Built responsive Navbar with theme toggle, brand styling, and logout functionality |
| 15 | **CSS Animations & Transitions** | ChatGPT | Added smooth transitions, hover effects, and loading animations across all components |
| 16 | **Form Styling & Layouts** | ChatGPT | Designed centered form layouts with modern card styling and gradient effects |
| 17 | **API Error Handling** | ChatGPT | Implemented try-catch blocks with user-friendly error messages in all API calls |
| 18 | **Environment Variable Setup** | ChatGPT | Generated .env.example files with proper documentation for all required variables |
| 19 | **Express Route Configuration** | ChatGPT | Set up authRoutes.js and userRoutes.js with proper HTTP methods and middleware |
| 20 | **CORS Configuration** | ChatGPT | Configured CORS middleware with appropriate origin and credentials settings |
| 21 | **Database Connection Logic** | ChatGPT | Wrote db.js with MongoDB connection, error handling, and retry logic |
| 22 | **Loading States Implementation** | ChatGPT | Added loading states with disabled buttons and loading text in all forms |
| 23 | **Responsive Design CSS** | ChatGPT | Created responsive styles for mobile, tablet, and desktop views |
| 24 | **Icon & Emoji Integration** | ChatGPT | Selected and integrated appropriate emojis for navbar, page titles, and README |
| 25 | **README Documentation** | ChatGPT | Generated comprehensive README structure with setup instructions and API docs |
| 26 | **Error Boundary Handling** | ChatGPT | Assisted in implementing proper error handling patterns across the application |
| 27 | **Token Expiration Logic** | ChatGPT | Implemented JWT token expiration and automatic logout functionality |
| 28 | **Code Refactoring** | ChatGPT | Suggested cleaner code patterns and removed redundant code blocks |
| 29 | **Comment Documentation** | ChatGPT | Added inline comments explaining complex logic in encryption and auth modules |
| 30 | **Testing Scenarios** | ChatGPT | Suggested test cases for API endpoints and edge case handling |

---

### 🎯 Effectiveness Score: **4.5 / 5**

**Justification:**

ChatGPT significantly enhanced development efficiency and code quality throughout this project:

**Time Savings (Score: 5/5):**
- Reduced boilerplate code writing by approximately **60-70%**
- Authentication and encryption implementations that would typically take **4-5 hours** were completed in **1.5 hours**
- Theme system setup and CSS variable generation saved **3+ hours** of manual work
- Overall project completion time reduced from an estimated **20-25 hours** to **10-12 hours**

**Code Quality (Score: 4/5):**
- Generated industry-standard security implementations (AES-256, bcrypt, JWT)
- Suggested proper error handling patterns and edge cases
- Provided consistent code formatting and naming conventions
- Some AI-generated code required refinement for project-specific requirements

**Learning & Understanding (Score: 5/5):**
- AI suggestions helped understand best practices for encryption and authentication
- Learned modern React patterns (Context API, custom hooks) through AI examples
- Gained insights into proper API design and RESTful conventions

**Debugging Challenges (Score: 4/5):**
- AI-generated encryption code required manual testing and IV handling adjustments
- Some CSS suggestions needed modification for specific theme requirements
- Minor debugging required for token handling in protected routes
- Overall, debugging AI code took **less time** than writing from scratch

**Overall Assessment:**
ChatGPT was **highly effective** for this project, particularly for:
- ✅ Boilerplate code generation (models, controllers, routes)
- ✅ Security implementations (encryption, hashing, JWT)
- ✅ UI component scaffolding and styling
- ✅ Documentation and code comments

**Areas where manual intervention was needed:**
- 🔧 Project-specific business logic
- 🔧 Custom theme color fine-tuning
- 🔧 Integration between frontend and backend
- 🔧 Testing and validation

**Score Breakdown:**
- Time Efficiency: 5/5
- Code Quality: 4/5
- Error Rate: 4/5
- Learning Value: 5/5
- **Average: 4.5/5**

---

## 🎨 UI/UX Features

### Theme System 🌓

The application implements a beautiful **Catppuccin theme** with two variants:

#### Mocha (Dark Theme) 🌙
- Base background: `#1e1e2e` (Dark blue-grey)
- Surface colors: `#313244`, `#45475a`, `#585b70`
- Accent colors: Mauve (`#cba6f7`), Blue (`#89b4fa`), Green (`#a6e3a1`)
- Text: `#cdd6f4` (Light grey)

#### Latte (Light Theme) ☀️
- Base background: `#eff1f5` (Light grey)
- Surface colors: `#ccd0da`, `#bcc0cc`, `#acb0be`
- Accent colors: Mauve (`#8839ef`), Blue (`#1e66f5`), Green (`#40a02b`)
- Text: `#4c4f69` (Dark grey)

### Design Features ✨

- **Centered Forms:** All authentication forms centered on screen
- **Gradient Buttons:** Beautiful gradient effects on primary buttons
- **Smooth Animations:** Transitions on hover, focus, and theme changes
- **Loading States:** User feedback during API calls
- **Responsive Navbar:** Fixed navigation with brand and theme toggle
- **Card Designs:** Elevated cards with shadows and borders
- **Form Labels:** Clear labels for all input fields
- **Error Handling:** User-friendly error messages

---

## 📱 Responsive Design

The application is fully responsive and tested on:
- 📱 **Mobile:** 320px - 480px
- 📱 **Tablet:** 481px - 768px
- 💻 **Laptop:** 769px - 1024px
- 🖥️ **Desktop:** 1025px+

---

## 🧪 Testing

### Manual Testing Checklist

#### Authentication Flow ✅
- [x] User registration with valid data
- [x] Registration with duplicate email (error handling)
- [x] Login with correct credentials
- [x] Login with incorrect password
- [x] Login with non-existent email
- [x] Token storage in localStorage
- [x] Token persistence across page refreshes

#### Profile Access ✅
- [x] Authorized profile access with valid token
- [x] Unauthorized access without token (redirect)
- [x] Aadhaar decryption verification
- [x] Profile data display correctness
- [x] Logout functionality

#### UI/UX Testing ✅
- [x] Theme toggle functionality
- [x] Theme persistence after reload
- [x] Form validation on all pages
- [x] Loading states during API calls
- [x] Responsive design on multiple devices
- [x] Navbar visibility and functionality

### API Testing (Postman) ✅
- [x] Register endpoint with valid/invalid data
- [x] Login endpoint with various scenarios
- [x] Profile endpoint with/without token
- [x] Error response format validation
- [x] CORS configuration testing

---

## 🚀 Deployment

### Backend Deployment (Render/Railway)

1. Create account on Render or Railway
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

## 📝 Future Enhancements

- [ ] Email verification during registration
- [ ] Password reset functionality
- [ ] Two-factor authentication (2FA)
- [ ] Profile picture upload
- [ ] User role management (Admin/User)
- [ ] Activity logs and audit trails
- [ ] Rate limiting on API endpoints
- [ ] Refresh token implementation
- [ ] Social authentication (Google, GitHub)
- [ ] Password strength meter
- [ ] Account deletion functionality
- [ ] Export user data (GDPR compliance)

---

## 🐛 Known Issues

- None at the moment! 🎉

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Kuldeep Choudhary**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- **LenDenClub** for the assignment opportunity
- **ChatGPT (OpenAI)** for AI-assisted development
- **Catppuccin** for the beautiful color theme
- **MongoDB** for the database platform
- **Vercel/Render** for hosting services

---

## 📞 Support

If you have any questions or run into issues:

1. Check the [Setup Instructions](#-setup--run-instructions)
2. Review the [API Documentation](#-api-documentation)
3. Open an issue on GitHub
4. Contact me via email

---

<div align="center">

**⭐ Star this repository if you found it helpful! ⭐**

Made with ❤️ and ☕ by Kuldeep Choudhary

</div>
