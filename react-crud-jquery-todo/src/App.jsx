// src/App.jsx
import CrudApp from "./components/CrudApp/CrudApp";
import TodoList from "./components/TodoList/TodoList";
import "./styless.css";

export default function App() {
  return (
    <div className="app-container">
      <h1>Vite React CRUD + jQuery Todo</h1>
      <div className="components-wrapper">
        <CrudApp />
        <TodoList />
      </div>
    </div>
  );
}
