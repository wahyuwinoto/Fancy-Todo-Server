const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middlewares/auth");
const TodoController = require("../controllers/todo-controller");

router.use(authenticate);
router.get("/", TodoController.listTodo);
router.post("/add", TodoController.addTodo);

router.get("/:id", authorize, TodoController.getTodoById);
router.put("/:id", authorize, TodoController.editTodo);
router.patch("/:id", authorize, TodoController.updateStatus);
router.delete("/:id", authorize, TodoController.deleteTodo);

module.exports = router;
