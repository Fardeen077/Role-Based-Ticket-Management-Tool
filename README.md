# Ticket Management System

## Summary
The Ticket Management System is an internal organizational tool designed to
capture, track, and resolve issues through a structured and role-based process.
It replaces informal communication channels with a centralized system that
ensures accountability, visibility, and controlled workflows.

The project focuses on system design, business logic, and access control rather
than just CRUD functionality, making it suitable for real-world enterprise use.

## Problem Statement
In growing organizations, issues are often reported through informal channels
such as WhatsApp groups or emails, leading to poor tracking, no accountability,
and delayed resolution.

This system centralizes issue reporting and resolution using a structured,
role-based workflow.

## Objectives
- Design a role-based access control system
- Implement real-world ticket lifecycle logic
- Apply business rules before coding
- Build a scalable full-stack application

## User Roles
- Employee(user): Creates and tracks tickets
- Agent: Works on assigned tickets
- Admin: Manages users, roles, and workflows

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Tailwind CSS
- Zustand
- Axios
- React Hook Form
- Zod
- React Hot Toast
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Express Validator
- Cookie Parser
- CORS
- Morgan
- dotenv

### Deployment & Tools
- Git
- GitHub
- Render
- MongoDB Atlas

## Important Notes
Before using the application, please keep the following in mind:
1. **Enable third-party cookies** in your browser. Authentication uses cookies, so if third-party cookies are blocked, login and other protected features may not work correctly.
2. **Please be patient when opening the website.** Both the frontend and backend are deployed on Render's free plan, so the first request after a period of inactivity may take 30–60 seconds while the services wake up.

## Live Link -> https://role-based-ticket-management-tool-1.onrender.com

## CredentialsUse 
the following credentials to test the admin features:

### ADMIN 
- **Email** admin@gmail.com
- **password** Admin@786

> **Note:** These credentials are for demo/testing purposes only.

## 🔧 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
MONGODB_URL=

PORT=

CORE_ORIGIN=http://localhost:5173

JWT_ACCESS_SECRET=JSONWEBTOKEN_ACCESS_SECRET
ACCESS_TOKEN_EXPIRED=1d

JWT_REFRESH_SECRET=JSONWEBTOKEN_REFRESH_SECRET
REFRESH_TOKEN_EXPIRED=7d
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/user/register` | Register a new user |
| POST | `/api/v1/user/login` | Authenticate user and generate JWT token |
| POST | `/api/v1/user/logout` | Logout the authenticated user |
| GET | `/api/v1/user/me` | Get the authenticated user's profile |
| GET | `/api/v1/user/agent` | Get all agent users (Admin only) |

### Ticket Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/ticket` | Create a new support ticket |
| GET | `/api/v1/ticket/getTicket` | Retrieve tickets based on user role |
| GET | `/api/v1/ticket/:id` | Get details of a specific ticket |
| PATCH | `/api/v1/ticket/:id/update-status` | Update ticket status (Admin/Agent) |
| GET | `/api/v1/ticket/search-users` | Search users for ticket assignment (Admin only) |
| PATCH | `/api/v1/ticket/:ticketId/assigned` | Assign a ticket to an agent (Admin only) |

## Timeline

- **Start Date:** January 2026
- **Completion Date:** March 2026
- **Status:** Completed 

