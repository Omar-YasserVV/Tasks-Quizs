// src/components/TodoList/TodoList.jsx
import { useEffect, useRef } from "react";
import $ from "jquery";
import "./styles.css";

export default function TodoList() {
  const todoRef = useRef(null);

  useEffect(() => {
    // Initialize jQuery code when component mounts
    const $todoApp = $(todoRef.current);

    // Add todo
    $todoApp.on("click", "#add-todo", function () {
      const $input = $todoApp.find("#todo-input");
      const text = $input.val().trim();

      if (text) {
        const $list = $todoApp.find(".todo-list");
        const todoId = Date.now();

        $list.append(`
          <li data-id="${todoId}">
            <span class="todo-text">${text}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </li>
        `);

        $input.val("");
      }
    });

    // Delete todo
    $todoApp.on("click", ".delete-btn", function () {
      $(this).closest("li").remove();
    });

    // Edit todo
    $todoApp.on("click", ".edit-btn", function () {
      const $li = $(this).closest("li");
      const $text = $li.find(".todo-text");
      const currentText = $text.text();

      $text.html(`
        <input type="text" class="edit-input" value="${currentText}">
        <button class="save-btn">Save</button>
      `);

      $li.find(".edit-btn, .delete-btn").hide();
    });

    // Save edited todo
    $todoApp.on("click", ".save-btn", function () {
      const $li = $(this).closest("li");
      const newText = $li.find(".edit-input").val().trim();

      if (newText) {
        $li.find(".todo-text").text(newText);
        $li.find(".edit-btn, .delete-btn").show();
      }
    });

    // Clean up when component unmounts
    return () => {
      $todoApp.off();
    };
  }, []);

  return (
    <div ref={todoRef} className="todo-container">
      <h2>jQuery Todo List</h2>
      <div>
        <input type="text" id="todo-input" placeholder="Enter a new todo" />
        <button id="add-todo">Add Todo</button>
      </div>
      <ul className="todo-list"></ul>
    </div>
  );
}
