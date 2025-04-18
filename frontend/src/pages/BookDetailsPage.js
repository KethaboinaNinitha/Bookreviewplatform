import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookDetailsPage.css';

function StarRating({ rating }) {
  const roundedRating = Math.round(rating); // Ensure the rating is rounded to the nearest integer
  return (
    <div className="star-rating">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < roundedRating ? 'filled' : ''}>
          ★
        </span>
      ))}
    </div>
  );
}

function StarRatingInput({ rating, setRating }) {
  const handleClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="star-rating-input">
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={index < rating ? 'filled' : ''}
          onClick={() => handleClick(index)}
          style={{ cursor: 'pointer' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: '', comment: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookResponse = await axios.get(`http://localhost:5000/books/${id}`);
        setBook(bookResponse.data);

        const reviewsResponse = await axios.get(`http://localhost:5000/reviews?bookId=${id}`);
        const reviewsWithNames = reviewsResponse.data.map((review) => ({
          ...review,
          userName: review.name, // Use 'name' instead of 'user_name'
        }));
        setReviews(reviewsWithNames);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch book details');
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/reviews', {
        bookId: id,
        userId: 1, // Replace with dynamic user ID
        ...newReview,
      });
      setReviews([...reviews, { ...newReview, id: reviews.length + 1 }]);
      setNewReview({ rating: '', comment: '' });
    } catch (err) {
      alert('Failed to submit review');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="book-details">
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <h2>Reviews</h2>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <StarRating rating={review.rating} />
            <p className="review-comment">{review.comment}</p>
            <p className="review-user">Reviewed by: {review.user_name}</p>
          </div>
        ))}
      </div>
      <h3>Submit a Review</h3>
      <form onSubmit={handleReviewSubmit} className="review-form">
        <div>
          <label>Rating:</label>
          <StarRatingInput
            rating={newReview.rating}
            setRating={(rating) => setNewReview({ ...newReview, rating })}
          />
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BookDetailsPage;