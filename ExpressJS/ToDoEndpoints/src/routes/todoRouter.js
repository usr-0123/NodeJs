import { Router } from "express";
import { getTodos, CreateTodo, updateTodo, getTodoById, deleteTodo, completeTodo } from "../controllers/todoController.js";

const todoRouter = Router();
    todoRouter.get("/todos", getTodos);
    todoRouter.post("/todos", CreateTodo);
    todoRouter.put("/todos/:id", updateTodo);
    todoRouter.get("/todos/:id", getTodoById);
    todoRouter.delete("/todos/:id", deleteTodo);
    todoRouter.patch("/todos/:id", completeTodo);

export default todoRouter;
