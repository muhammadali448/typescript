import { Router } from "express";
import bodyParser from "body-parser";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todos";

const router = Router();
router.use(bodyParser.json());
router.route("/").get(getTodos).post(createTodo);

router.patch(("/:id"), updateTodo);
router.delete("/:id", deleteTodo);

export default router;