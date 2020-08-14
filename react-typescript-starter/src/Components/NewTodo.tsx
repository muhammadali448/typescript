import React, { FormEvent, useRef } from "react";
import "./NewTodo.css";
interface AddTodoType {
  addTodo: (title: string) => void;
}
const NewTodo: React.FC<AddTodoType> = ({ addTodo }) => {
  const todoTxtRef = useRef<HTMLInputElement>(null);
  const handleSubmitTodo = (event: FormEvent) => {
    event.preventDefault();
    const todoText = todoTxtRef.current!.value;
    addTodo(todoText);
    // console.log(todoText);
  };
  return (
    <form onSubmit={handleSubmitTodo}>
      <div className="form-control">
        <label htmlFor="todo-text">Enter Todo</label>
        <input type="text" id="todo-text" ref={todoTxtRef} />
      </div>
      <button type="submit">Save Todo</button>
    </form>
  );
};

export default NewTodo;
