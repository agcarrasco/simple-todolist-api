const express = require("express");

const todoController = require("../../controllers/todo.controller");

const todoRouter = express.Router();

todoRouter
  .route("/")
  .get(todoController.getAllTodoItems)
  .post(todoController.createTodoItem);
todoRouter
  .route("/:itemId")
  .get(todoController.getTodoItem)
  .put(todoController.updateTodoItem)
  .delete(todoController.deleteTodoItem);

module.exports = todoRouter;
