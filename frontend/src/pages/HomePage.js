import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/books?page=1&limit=5')
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch featured books');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-page">
      <h1>Welcome to BooKReviewz</h1>
      <h2>Featured Books</h2>
      <div className="featured-books">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img
              src={`https://via.placeholder.com/150?text=${encodeURIComponent(book.title)}`}
              alt={book.title}
              className="book-image"
            />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">by {book.author}</p>
            <Link to={`/books/${book.id}`} className="book-link">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;