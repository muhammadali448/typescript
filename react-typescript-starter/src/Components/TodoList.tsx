import React from "react";
import "./TodoList.css";
interface ItemsType {
  items: { id: string; title: string }[];
  deleteTodo: (id: string) => void;
}

const TodoList: React.FC<ItemsType> = ({ items, deleteTodo }) => {
  const onHandleDelete = (id: string) => {
    deleteTodo(id);
  };
  return (
    <ul>
      {items.map((todo) => (
        <li key={todo.id}>
          <p>{todo.title}</p>
          <button onClick={() => onHandleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
