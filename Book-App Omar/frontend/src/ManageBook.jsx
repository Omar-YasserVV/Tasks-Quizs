import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookForm from "./BookForm";
import axios from "axios";

const API_URL = "http://localhost:5000/books";

const ManageBook = ({ fetchBooks, editingBook, setEditingBook }) => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    price: "",
    author: "",
    desc: "",
    image: null,
  });

  useEffect(() => {
    if (editingBook) {
      setBook(editingBook);
    } else {
      setBook({ title: "", price: "", author: "", desc: "", image: null });
    }
  }, [editingBook]);

  // 🟢 Add a New Book
  const addBook = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(book).forEach((key) => {
        if (book[key]) formData.append(key, book[key]);
      });

      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setEditingBook(null);
      setBook({ title: "", price: "", author: "", desc: "", image: null });
      fetchBooks();
      navigate("/");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const updateBook = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(book).forEach((key) => {
        if (book[key]) formData.append(key, book[key]);
      });

      await axios.put(`${API_URL}/${book._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setEditingBook(null);
      setBook({ title: "", price: "", author: "", desc: "", image: null });
      fetchBooks();
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center">
        {editingBook ? "Edit Book" : "Add New Book"}
      </h1>
      <div className="text-end mb-3">
        <Link to="/" className="btn btn-secondary">
          Back to Home
        </Link>
      </div>
      <BookForm
        book={book}
        setBook={setBook}
        handleSubmit={editingBook ? updateBook : addBook}
        editingBook={editingBook}
      />
    </div>
  );
};

export default ManageBook;
