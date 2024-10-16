import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Register and login
export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (userData) => api.post("/auth/login", userData);

// Books crud operation
export const fetchBooks = (token) =>
  api.get("/books", {
    headers: { "x-access-token": token },
  });

export const addBook = async (formData, token) => {
  return await axios.post("api/books", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateBook = async (id, formData, token) => {
  return await axios.put(`/api/books/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteBook = (id, token) =>
  api.delete(`/books/${id}`, {
    headers: { "x-access-token": token },
  });
