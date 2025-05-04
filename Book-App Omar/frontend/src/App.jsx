import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import ManageBook from "./ManageBook";
import axios from "axios";

const API_URL = "http://localhost:5000/books";

const App = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1 container my-4">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  books={books}
                  setEditingBook={setEditingBook}
                  deleteBook={deleteBook}
                />
              }
            />
            <Route
              path="/manage"
              element={
                <ManageBook
                  fetchBooks={fetchBooks}
                  editingBook={editingBook}
                  setEditingBook={setEditingBook}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
