# **NestJS Authentication API Documentation**

## **Base URL**
```
http://localhost:3000/auth
```

---

## **1. User Signup (Register)**
### **Endpoint:**
```
POST /auth/signup
```
### **Description:**
Registers a new user.

### **Request Headers:**
```
Content-Type: application/json
```

### **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "user" 
}
```
### **Role Options:**
- "user" (Default)
- "admin"
- "moderator"

### **Response (201 Created):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "user"
}
```

---

## **2. User Login**
### **Endpoint:**
```
POST /auth/login
```
### **Description:**
Logs in an existing user and returns Access Token & Refresh Token.

### **Request Headers:**
```
Content-Type: application/json
```

### **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### **Response (200 OK):**
```json
{
  "access_token": "YOUR_ACCESS_TOKEN_HERE",
  "refresh_token": "YOUR_REFRESH_TOKEN_HERE"
}
```

---

## **3. Get User Profile (Protected Route)**
### **Endpoint:**
```
GET /auth/profile
```
### **Description:**
Fetches the logged-in user's profile.

### **Request Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

### **Response (200 OK):**
```json
{
  "message": "Authenticated User",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user"
  }
}
```

### **Response (401 Unauthorized):**
```json
{
  "statusCode": 401,
  "message": "Access Denied! Invalid Token",
  "error": "Unauthorized"
}
```

---

## **4. Refresh Access Token**
### **Endpoint:**
```
POST /auth/refresh-token
```
### **Description:**
Gets a new access token using a valid refresh token.

### **Request Headers:**
```
Content-Type: application/json
```

### **Request Body:**
```json
{
  "token": "YOUR_REFRESH_TOKEN_HERE"
}
```

### **Response (200 OK):**
```json
{
  "access_token": "NEW_ACCESS_TOKEN_HERE"
}
```

### **Response (401 Unauthorized):**
```json
{
  "statusCode": 401,
  "message": "Invalid refresh token",
  "error": "Unauthorized"
}
```

---

## **5. Admin-Only Route (Role-Based Access)**
### **Endpoint:**
```
GET /auth/admin
```
### **Description:**
Only **Admins** can access this route.

### **Request Headers:**
```
Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN_HERE
```

### **Response (200 OK):**
```json
{
  "message": "Admin Access Granted",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### **Response (403 Forbidden) (If User is Not Admin):**
```json
{
  "statusCode": 403,
  "message": "You do not have permission to access this resource.",
  "error": "Forbidden"
}
```

---

## **Postman API Setup Guide**
### **For Authentication Requests:**
1. Go to the **Authorization** tab in Postman.
2. Select **Bearer Token** and paste `access_token`.
3. For protected routes, use the `access_token`.
4. For `/auth/refresh-token`, send `refresh_token` in the request body.

---

## **📌 Setup for GitHub (README)**

### **Project Setup**
```bash
git clone https://github.com/your-repo/jwt-auth-nestjs.git
cd jwt-auth-nestjs
npm install
```

### **Run the Project**
```bash
npm run start
```

### **Environment Variables (`.env` File)**
```
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=auth_db
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_EXPIRES_IN=7d
```

---

### **🔥 Now your API is fully documented and ready to use! 🚀**

