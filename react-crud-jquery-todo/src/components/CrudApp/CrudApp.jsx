// src/components/CrudApp/CrudApp.jsx
import { useState } from "react";
import { Item } from "../../models/Item";
import "./styles.css";

export default function CrudApp() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentItem) {
      // Update existing item
      const updatedItems = items.map((item) =>
        item.id === currentItem.id ? new Item(item.id, name, description) : item
      );
      setItems(updatedItems);
      setCurrentItem(null);
    } else {
      // Create new item
      const newItem = new Item(Date.now(), name, description);
      setItems([...items, newItem]);
    }

    setName("");
    setDescription("");
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setName(item.name);
    setDescription(item.description);
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="crud-container">
      <h2>CRUD Operations with OOP</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">{currentItem ? "Update" : "Create"}</button>
        {currentItem && (
          <button
            type="button"
            onClick={() => {
              setCurrentItem(null);
              setName("");
              setDescription("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <ul className="items-list">
        {items.map((item) => (
          <li key={item.id}>
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>
                <em>{item.getInfo()}</em>
              </p>
            </div>
            <div>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
