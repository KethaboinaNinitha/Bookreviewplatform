# Book Review Platform

This project is a book review platform where users can browse books, read and write reviews, and rate books. The application consists of a React frontend and a Node.js backend using Express and MySQL.

## Features

### Frontend (React)
- Responsive UI with the following pages/components:
  - Home page with featured books
  - Book listing page with search and filter functionality
  - Individual book page with details and reviews
  - User profile page
  - Review submission form
- State management using Redux
- React Router for navigation
- Integration with the backend API
- Error handling and loading states

### Backend (Node.js, Express, MySQL)
- RESTful API with the following endpoints:
  - `GET /books` - Retrieve all books (with pagination)
  - `GET /books/:id` - Retrieve a specific book
  - `POST /books` - Add a new book (admin only)
  - `GET /reviews` - Retrieve reviews for a book
  - `POST /reviews` - Submit a new review
  - `GET /users/:id` - Retrieve user profile
  - `PUT /users/:id` - Update user profile
- Data validation and error handling
- MySQL for data persistence

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MySQL server installed and running

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   - Create a MySQL database named `book_review_platform`.
   - Run the SQL script in `database.sql` to create the necessary tables.
4. Start the backend server:
   ```bash
   node index.js
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Access the Application
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- API Documentation (Swagger): `http://localhost:5000/api-docs`

## License
This project is licensed under the MIT License.