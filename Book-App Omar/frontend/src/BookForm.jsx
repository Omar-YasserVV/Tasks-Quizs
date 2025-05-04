import React, { useState } from "react";

const BookForm = ({ book, setBook, handleSubmit, editingBook }) => {
  const [imagePreview, setImagePreview] = useState(book.image || "");

  const handleChange = (e) => {
    setBook({ ...book, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setBook({ ...book, image: file });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          id="title"
          value={book.title}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          id="price"
          value={book.price}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Author</label>
        <input
          type="text"
          id="author"
          value={book.author}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          id="desc"
          value={book.desc}
          onChange={handleChange}
          className="form-control"
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Book Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="form-control"
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mt-2" width="100" />
        )}
      </div>
      <button type="submit" className="btn btn-success">
        {editingBook ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
};

export default BookForm;
