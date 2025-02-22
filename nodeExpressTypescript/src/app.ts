import express, { NextFunction, Request, Response } from 'express';
import todosRoutes from "./routes/todos";
const app = express();

app.use("/todos", todosRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message })
});
app.listen(3000, () => {
    console.log("Server started")
});