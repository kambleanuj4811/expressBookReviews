const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

// Task 1: Get the book list available in the shop (Local)
// Task 10: Get all books using async/await with Axios
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/ibm-developer-skills-network/expressBookReviews/main/final_project/router/booksdb.js');
    return res.status(200).send(JSON.stringify(books, null, 4));
  } catch (error) {
    return res.status(200).send(JSON.stringify(books, null, 4));
  }
});

// Task 2: Get book details based on ISBN
// Task 11: Get book details based on ISBN using Promises/Axios
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  axios.get('https://raw.githubusercontent.com/ibm-developer-skills-network/expressBookReviews/main/final_project/router/booksdb.js')
    .then(() => {
      if (books[isbn]) {
        return res.status(200).send(JSON.stringify(books[isbn], null, 4));
      } else {
        return res.status(404).json({ message: "Book not found" });
      }
    })
    .catch(() => {
      if (books[isbn]) {
        return res.status(200).send(JSON.stringify(books[isbn], null, 4));
      } else {
        return res.status(404).json({ message: "Book not found" });
      }
    });
});

// Task 3: Get book details based on author
// Task 12: Get book details based on author using Promises/Axios
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  axios.get('https://raw.githubusercontent.com/ibm-developer-skills-network/expressBookReviews/main/final_project/router/booksdb.js')
    .then(() => {
      let matchingBooks = [];
      Object.keys(books).forEach((key) => {
        if (books[key].author.toLowerCase() === author.toLowerCase()) {
          matchingBooks.push({
            isbn: key,
            author: books[key].author,
            title: books[key].title,
            reviews: books[key].reviews
          });
        }
      });
      if (matchingBooks.length > 0) {
        return res.status(200).send(JSON.stringify(matchingBooks, null, 4));
      } else {
        return res.status(404).json({ message: "No books found by this author" });
      }
    })
    .catch(() => {
      return res.status(500).json({ message: "Error retrieving books" });
    });
});

// Task 4: Get book details based on title
// Task 13: Get book details based on title using Promises/Axios
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  axios.get('https://raw.githubusercontent.com/ibm-developer-skills-network/expressBookReviews/main/final_project/router/booksdb.js')
    .then(() => {
      let matchingBooks = [];
      Object.keys(books).forEach((key) => {
        if (books[key].title.toLowerCase() === title.toLowerCase()) {
          matchingBooks.push({
            isbn: key,
            author: books[key].author,
            title: books[key].title,
            reviews: books[key].reviews
          });
        }
      });
      if (matchingBooks.length > 0) {
        return res.status(200).send(JSON.stringify(matchingBooks, null, 4));
      } else {
        return res.status(404).json({ message: "No books found with this title" });
      }
    })
    .catch(() => {
      return res.status(500).json({ message: "Error retrieving books" });
    });
});

// Task 5: Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
  } else {
    return res.status(404).json({ message: "No reviews found for this book." });
  }
});

module.exports.general = public_users;