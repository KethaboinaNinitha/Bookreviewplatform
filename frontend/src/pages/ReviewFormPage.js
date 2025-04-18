import React, { useState } from 'react';
import axios from 'axios';

function ReviewFormPage() {
  const [bookId, setBookId] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/reviews', { bookId, userId: 1, rating, comment }) // Replace userId with dynamic value
      .then(() => {
        setMessage('Review submitted successfully');
      })
      .catch(() => {
        setMessage('Failed to submit review');
      });
  };

  return (
    <div>
      <h1>Submit a Review</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Book ID:</label>
          <input type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} required />
        </div>
        <div>
          <label>Rating:</label>
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} required />
        </div>
        <div>
          <label>Comment:</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ReviewFormPage;