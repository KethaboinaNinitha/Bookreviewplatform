CREATE DATABASE IF NOT EXISTS book_review_platform;

USE book_review_platform;

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    FOREIGN KEY (book_id) REFERENCES books(id)
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

ALTER TABLE users ADD COLUMN password VARCHAR(255) NOT NULL;

-- test data

INSERT INTO books (title, author, description) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'A novel set in the Jazz Age that tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.'),
('To Kill a Mockingbird', 'Harper Lee', 'A novel about racial injustice in the Deep South, seen through the eyes of young Scout Finch.'),
('1984', 'George Orwell', 'A dystopian novel that explores the dangers of totalitarianism and extreme political ideology.'),
('Pride and Prejudice', 'Jane Austen', 'A classic romance novel that explores themes of love, class, and social expectations.'),
('Moby-Dick', 'Herman Melville', 'A novel about the obsessive quest of Captain Ahab to hunt the white whale, Moby Dick.');

INSERT INTO users (name, email,password) VALUES
('Test User', 'testuser@example.com','$2b$10$o4D9APgIC2lmbS.sE7e1Nut0DAAjeoE021bAS5peVf6IopBDEazMW');