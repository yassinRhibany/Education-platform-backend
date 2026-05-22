# Educational Platform Backend API

A robust and secure backend RESTful API built for an educational platform where Teachers can manage courses and lessons, and Students can browse educational content.

## 🚀 Features
- **User Authentication & Authorization:** Secure signup and login using **JWT (JSON Web Tokens)** and password hashing.
- **Role-Based Access Control (RBAC):** Dedicated permissions for `TEACHER` and `STUDENT` roles.
- **Course Management:** Teachers can create and manage courses categorized by a fixed `CourseSubject` enum.
- **Database Management:** Structured PostgreSQL database powered by **Prisma ORM**.
- **Containerization:** Easy local setup using **Docker** for the database environment.

---

## 🛠️ Tech Stack
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (via Docker)
- **ORM:** Prisma
- **Security:** bcryptjs, JSON Web Tokens (JWT)

---

## 💻 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Docker](https://www.docker.com/) & Docker Desktop
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone [https://github.com/yassinRhibany/Education-platform-backend.git](https://github.com/yassinRhibany/Education-platform-backend.git)
cd Education-platform-backend

2. Install Dependencies
cd back
   npm install

3. Setup Environment Variables
Create a .env file in the root directory and add the following configuration:
PORT=3000
DATABASE_URL="postgresql://postgres:password123@localhost:5432/education_db?schema=public"
JWT_SECRET="your_super_secret_key_here"
(Note: Change the credentials in DATABASE_URL to match your local Docker setup if necessary).


4. Start the Database (Docker)
Ensure Docker Desktop is running, then start your PostgreSQL container:
docker-compose up -d

5. Run Database Migrations
Initialize the database schema using Prisma:
npx prisma db push

6. Start the Server
Run the development server:


npm start
The server will be running smoothly at http://localhost:3000.

🔍 API Testing & DB Inspection
Prisma Studio: To inspect the database via a GUI browser interface, run:
  npx prisma studio
Postman: You can test the endpoints (/api/auth/register, /api/auth/login, /api/courses) by passing the JWT token in the Authorization header as Bearer <YOUR_TOKEN>.