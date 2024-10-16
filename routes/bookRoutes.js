const express = require("express");
const {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const authenticateToken = require("../middleware/authenticateToken"); // Import the middleware

const router = express.Router();

router.post("/books", authenticateToken, addBook);
router.put("/books/:id", authenticateToken, updateBook);
router.delete("/books/:id", authenticateToken, deleteBook);
router.get("/books", authenticateToken, getBooks);

module.exports = router;
