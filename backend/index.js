const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'book_review_platform',
  port:3308
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Review Platform API',
      version: '1.0.0',
      description: 'API documentation for the Book Review Platform',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Endpoints

// GET /books - Retrieve all books (with pagination)
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve all books
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   description:
 *                     type: string
 */
app.get('/books', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const query = 'SELECT * FROM books LIMIT ? OFFSET ?';
  db.query(query, [parseInt(limit), parseInt(offset)], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving books');
    } else {
      res.json(results);
    }
  });
});

// GET /books/:id - Retrieve a specific book
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retrieve a specific book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: A single book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 description:
 *                   type: string
 */
app.get('/books/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM books WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving book');
    } else {
      res.json(results[0]);
    }
  });
});

// POST /books - Add a new book (admin only)
app.post('/books', (req, res) => {
  const { title, author, description } = req.body;

  const query = 'INSERT INTO books (title, author, description) VALUES (?, ?, ?)';
  db.query(query, [title, author, description], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error adding book');
    } else {
      res.status(201).send('Book added successfully');
    }
  });
});

// GET /reviews - Retrieve reviews for a book
/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Retrieve reviews for a book
 *     parameters:
 *       - in: query
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: A list of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   book_id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   rating:
 *                     type: integer
 *                   comment:
 *                     type: string
 */
app.get('/reviews', (req, res) => {
  const { bookId, userId } = req.query;

  let query = 'SELECT reviews.*, users.name AS user_name FROM reviews JOIN users ON reviews.user_id = users.id';
  const queryParams = [];

  if (bookId) {
    query += ' WHERE reviews.book_id = ?';
    queryParams.push(bookId);
  }

  if (userId) {
    query += bookId ? ' AND reviews.user_id = ?' : ' WHERE reviews.user_id = ?';
    queryParams.push(userId);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving reviews');
    } else {
      res.json(results);
    }
  });
});

// POST /reviews - Submit a new review
/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Submit a new review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review submitted successfully
 */
app.post('/reviews', (req, res) => {
  const { bookId, userId, rating, comment } = req.body;

  const query = 'INSERT INTO reviews (book_id, user_id, rating, comment) VALUES (?, ?, ?, ?)';
  db.query(query, [bookId, userId, rating, comment], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error submitting review');
    } else {
      res.status(201).send('Review submitted successfully');
    }
  });
});

// GET /users/:id - Retrieve user profile
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve user profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: A single user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 */
app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving user profile');
    } else {
      res.json(results[0]);
    }
  });
});

// PUT /users/:id - Update user profile
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 */
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  db.query(query, [name, email, id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating user profile');
    } else {
      res.send('User profile updated successfully');
    }
  });
});

// POST /login - Validate user credentials and return user details
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error logging in');
    } else if (results.length === 0) {
      res.status(401).send('Invalid credentials');
    } else {
      res.json({ id: results[0].id, name: results[0].name, email: results[0].email });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});