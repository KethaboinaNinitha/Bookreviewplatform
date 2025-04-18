import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookListingPage.css';

function BookListingPage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/books')
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch books');
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, authorFilter);
  };

  const handleAuthorFilter = (e) => {
    const author = e.target.value;
    setAuthorFilter(author);
    applyFilters(searchQuery, author);
  };

  const applyFilters = (query, author) => {
    const filtered = books.filter(
      (book) =>
        (book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)) &&
        (author === '' || book.author === author)
    );
    setFilteredBooks(filtered);
  };

  const uniqueAuthors = [...new Set(books.map((book) => book.author))];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="book-listing">
      <h1>Book Listing</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
        <select value={authorFilter} onChange={handleAuthorFilter} className="author-filter">
          <option value="">All Authors</option>
          {uniqueAuthors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>
      <div className="book-grid">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book-card">
            <img
              src={`https://via.placeholder.com/150?text=${encodeURIComponent(book.title)}`}
              alt={book.title}
              className="book-image"
            />
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author">by {book.author}</p>
            <p className="book-description">{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookListingPage;