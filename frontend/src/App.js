import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookListingPage from './pages/BookListingPage';
import BookDetailsPage from './pages/BookDetailsPage';
import UserProfilePage from './pages/UserProfilePage';
import ReviewFormPage from './pages/ReviewFormPage';
import LoginPage from './pages/LoginPage';
import Navbar from './Navbar';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BookListingPage />} />
        <Route path="/books/:id" element={<BookDetailsPage user={user} />} />
        <Route path="/profile" element={<UserProfilePage user={user} />} />
        <Route path="/review" element={<ReviewFormPage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
