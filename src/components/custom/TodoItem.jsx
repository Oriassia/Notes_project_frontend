import React from "react";

function TodoItem(props) {
  const { todo, handleTodoCheckBoxChange } = props;

  return (
    <li
      key={todo._id}
      className={`flex items-center ${todo.isComplete ? "line-through" : ""}`}
    >
      <input
        type="checkbox"
        checked={todo.isComplete}
        onChange={(ev) => handleTodoCheckBoxChange(todo._id, ev.target.checked)}
      />
      <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
        {todo.title}
      </span>
    </li>
  );
}

export default TodoItem;
