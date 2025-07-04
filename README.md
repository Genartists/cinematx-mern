# Movies Inventory Web App

**Project name:** Cinematx
**Author:** Harry Le

### Overview

Cinematx is a full-stack movie management web application developed using the MERN stack: MongoDB, Express.js, React.js, and Node.js. It supports secure user registration and login, and allows authenticated users to create, edit, view, and delete their own movie collections.

## **Features**

- Secure user registration and login using JWT + bcrypt
- Full CRUD operations for movies (title, description, year, genres, rating)
- Access control: only movie owners can edit/delete
- Input validation and error handling on both frontend and backend
- Responsive React UI with protected routes and conditional rendering
- Deployment-ready on Heroku with environment configuration

## **Tech Stack**

### Frontend

- React.js (with Context API)
- SWR hooks
- React Router DOM
- Axios (API calls)
- Form validation
- Tailwind CSS

### Backend

- Node.js + Express.js (Pug)
- JWT authentication
- Bcrypt password hashing
- Middleware for auth and error handling

### Database

- MongoDB Atlas
- Mongoose ORM (schemas, models, queries)

### Tooling

- Postman
- Git & GitHub
- VSCode

## **Software Architecture**

**Client-Server Architecture**

![[movies-web-app.jpg]]

**Architecture Overview:**

- **Presentation Tier** (Client):
  - **React.js** frontend
  - Handles UI/UX, routing, user interaction, and sending HTTP requests
- **Application Tier** (Server):
  - **Express.js (Node.js)** backend
  - Contains business logic, API endpoints, authentication, and validation
- **Data Tier** (Database):
  - **MongoDB** via Mongoose
  - Stores and manages data (users, movies) in a cloud-hosted NoSQL database (MongoDB Atlas)

## **Flowchart**

![[movies-web-flow.png]]

## **Project Structure**

```bash
cinematx/
├── client/
│   ├── controllers/         # Auth and movie logic
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Auth & movie routes
│   ├── middleware/          # Auth middleware, error handler
│   ├── utils/
│   ├── .env
│   └── server.js
│
├── server/
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Login, Register, MovieList, etc.
│   │   ├── services/        # API calls via Axios
│   │   ├── context/         # Auth context
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env
│
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
├── README.md
└── .gitignore
```

## **Deployment**

- Use Heroku for both frontend and backend
- Set up MongoDB Atlas connection
- Environment variables in `.env` (JWT_SECRET, DB_URI, etc.)
