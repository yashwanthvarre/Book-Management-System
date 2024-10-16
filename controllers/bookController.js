const db = require("../models/bookModel");

// Add a new book
const addBook = (req, res) => {
  const { title, author, description } = req.body;

  db.run(
    "INSERT INTO books (title, author, description) VALUES (?,?,?)",
    [title, author, description],
    function (err) {
      if (err) {
        res.status(500).send("Error adding a book");
      } else {
        res
          .status(201)
          .send({ message: "Added successfully", bookID: this.lastID });
      }
    }
  );
};

// Get all books
const getBooks = (req, res) => {
  db.all("SELECT * FROM books", [], (err, rows) => {
    if (err) {
      return res.status(500).send("Error fetching books");
    }
    res.status(200).send(rows);
  });
};

// Update a book
const updateBook = (req, res) => {
  const { title, author, description } = req.body;
  const { id } = req.params;

  db.run(
    "UPDATE books SET title = ?, author= ?, description=? WHERE id = ?",
    [title, author, description, id],
    function (err) {
      if (err) {
        return res.status(500).send("Error updating the book");
      }
      res.status(200).send({ message: "Book updated successfully" });
    }
  );
};

// Delete a book
const deleteBook = (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM books WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).send("Error deleting a book");
    }
    res.status(200).send({ message: "Book deleted successfully" });
  });
};

// Export the functions using CommonJS syntax
module.exports = {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
};
