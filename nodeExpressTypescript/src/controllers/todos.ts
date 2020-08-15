import { RequestHandler } from "express";
import { Todo } from "../models/todo";
const TODOS: Todo[] = [];
export const createTodo: RequestHandler = (req, res, next) => {
    // const body: { title: string } = req.body;
    const title = (req.body as { title: string }).title;
    const newTodo = new Todo(Math.random().toString(), title);
    TODOS.push(newTodo);
    res.status(201).json({ message: "New todo created", todo: newTodo.getTodo });
}
export const getTodos: RequestHandler = (req, res, next) => {
    res.status(201).json({ todos: TODOS });
}
export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const id = req.params.id;
    const title = (req.body as { title: string }).title;
    const todoIndex = TODOS.findIndex(todo => todo.getTodo.id === id);
    if (todoIndex === -1) {
        throw new Error("Todo not found");
    }
    TODOS[todoIndex] = new Todo(id, title);
    res.status(201).json({ message: "Todo updated", todo: TODOS[todoIndex] })
}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const id = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.getTodo.id === id);
    if (todoIndex === -1) {
        throw new Error("Todo not found");
    }
    TODOS.splice(todoIndex, 1);
    res.status(201).json({ message: "Todo deleted" })
}
