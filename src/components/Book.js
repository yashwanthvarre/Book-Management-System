import React, { useState, useEffect } from "react";
import { fetchBooks, deleteBook } from "../api";
import BookForm from "./BookForm";

const Books = ({ token }) => {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      const res = await fetchBooks(token);
      setBooks(res.data);
    };

    loadBooks();
  }, [token]);

  const handleDelete = async (id) => {
    await deleteBook(id, token);
    setBooks(books.filter((book) => book.id !== id));
  };
  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>{book.description}</p>
            <button onClick={() => setEditBook(book)}>Edit</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <BookForm token={token} editBook={editBook} setEditBook={setEditBook} />
    </div>
  );
};

export default Books;
