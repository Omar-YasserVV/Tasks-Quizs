import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";

const app = express();
const PORT = 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/bookstore")
  .then(() => console.log("✅ Connected to MongoDB"));

const bookSchema = new mongoose.Schema({
  title: String,
  price: Number,
  author: String,
  description: String,
  image: String,
});
const Book = mongoose.model("Book", bookSchema);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));

const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

app.post("/books", upload.single("image"), async (req, res) => {
  try {
    const newBook = new Book({
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });
    await newBook.save();
    res.json(newBook);
  } catch (err) {
    res.status(500).json({ error: "Failed to save book" });
  }
});

app.put("/books/:id", upload.single("image"), async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file) update.image = `/uploads/${req.file.filename}`;

    const book = await Book.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!book) return res.status(404).json({ error: "Book not found" });

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Failed to update book" });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete book" });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
