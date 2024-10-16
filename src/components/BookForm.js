import React, { useState, useEffect } from "react";
import { addBook, updateBook } from "../api";
const BookForm = ({ token, editBook, SetEditBook }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
  });

  useEffect(() => {
    if (editBook) {
      setFormData(editBook);
    }
  }, [editBook]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editBook) {
      await updateBook(editBook.id, formData, token);
    } else {
      await addBook(formData, token);
    }
    SetEditBook(null);
    setFormData({ title: "", author: "", description: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <button type="submit">{editBook ? "Update" : "Add"} Book</button>
    </form>
  );
};

export default BookForm;
