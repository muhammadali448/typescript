import React, { useState } from "react";
import TodoList from "./Components/TodoList";
import NewTodo from "./Components/NewTodo";
import { Todo } from "./models/todo";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const addTodoHandler = (title: string) => {
    // console.log(title);
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), title },
    ]);
  };
  const onHandleDelete = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  return (
    <div>
      <NewTodo addTodo={addTodoHandler} />
      <TodoList items={todos} deleteTodo={onHandleDelete} />
    </div>
  );
};

export default App;
