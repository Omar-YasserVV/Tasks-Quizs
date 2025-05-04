import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = ({ books, setEditingBook, deleteBook }) => {
  const navigate = useNavigate();

  const handleAddBook = () => {
    setEditingBook(null);
    navigate("/manage");
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    navigate("/manage");
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Book List</h1>

      <div className="text-end mb-3">
        <button className="btn btn-success" onClick={handleAddBook}>
          Add New Book
        </button>
      </div>

      {books.length === 0 ? (
        <p className="text-center fs-5">No books available. Add a new book!</p>
      ) : (
        <div className="row">
          {books.map((book) => (
            <div key={book._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card shadow h-100">
                {book.image && (
                  <img
                    src={`http://localhost:5000${book.image}`}
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ${book.price}
                  </p>

                  <p className="card-text">
                    <strong>Description:</strong>{" "}
                    {book.desc
                      ? book.desc.substring(0, 100) +
                        (book.desc.length > 100 ? "..." : "")
                      : "No description available"}
                  </p>

                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleEditBook(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteBook(book._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
