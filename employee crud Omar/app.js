const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/employees_db")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(ejsLayouts);
app.set("layout", "partials/layout"); // ✅ fixed extension

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const employeeRoutes = require("./routes/employee.Routes");
app.use("/", employeeRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
