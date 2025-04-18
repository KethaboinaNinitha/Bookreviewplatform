import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Navbar({ user }) {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/books" className="nav-link">Books</Link>
      {user ? (
        <>
          <Link to="/profile" className="nav-link">Profile</Link>
          <span className="nav-user">Welcome, {user.name}</span>
        </>
      ) : (
        <Link to="/login" className="nav-link">Login</Link>
      )}
    </nav>
  );
}

export default Navbar;