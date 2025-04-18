import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfilePage.css';

function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:5000/users/1'); // Replace with dynamic user ID
        setUser(userResponse.data);
        setUpdatedUser({ name: userResponse.data.name, email: userResponse.data.email });

        const reviewsResponse = await axios.get('http://localhost:5000/reviews?userId=1'); // Replace with dynamic user ID
        setReviews(reviewsResponse.data);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/users/1', updatedUser); // Replace with dynamic user ID
      setUser(updatedUser);
      setEditMode(false);
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      {editMode ? (
        <form onSubmit={handleUpdateProfile} className="profile-form">
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={updatedUser.name}
              onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={updatedUser.email}
              onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
              required
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
      <h2>Your Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {review.comment} - {review.rating} stars
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfilePage;