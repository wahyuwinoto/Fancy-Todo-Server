const { Todo } = require("../models");
const axios = require("axios");

class TodoController {
  static listTodo(req, res, next) {
    let UserId = req.decoded.id;

    Todo.findAll({
      where: { UserId },
      order: [["id", "ASC"]],
    })
      .then((todo) => {
        res.status(200).json(todo);
      })
      .catch((err) => {
        next(err);
      });
  }

  static addTodo(req, res, next) {
    console.log(req.body, "req body");

    let title = req.body.title || "";
    let description = req.body.description || "";
    let status = req.body.status || "";
    let due_date = req.body.due_date || "";
    let UserId = req.decoded.id;
    console.log("UserId: ", UserId);
    Todo.create({
      title,
      description,
      status,
      due_date: new Date(due_date),
      UserId,
    })
      .then((todo) => {
        console.log("todo: ", todo); //todo
        res.status(201).json(todo);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getTodoById(req, res, next) {
    let id = req.params.id;
    let UserId = req.decoded.id;
    Todo.findOne({
      where: { id, UserId },
    })
      .then((todo) => {
        console.log("todo: ", todo);
        if (todo === null) {
          throw {
            status: 401,
            message: "You Not Authorized",
          };
        } else {
          res.status(200).json(todo);
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static editTodo(req, res, next) {
    let id = req.body.id;
    let UserId = req.headers.User.id;
    let title = req.body.title || "";
    let description = req.body.description || "";
    let due_date = req.body.due_date || "";
    let status = false;
    Todo.update(
      { title, description, status, due_date },
      { where: { id, UserId }, returning: true }
    )
      .then((todo) => {
        if (!todo[0]) {
          throw {
            status: 401,
            message: "You Not Authorized",
          };
        } else {
          res.status(200).json(todo[1]);
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateStatus(req, res, next) {
    let id = +req.body.id;
    let UserId = req.headers.User.id;
    let status = req.body.status || false;
    Todo.update(
      { status },
      {
        where: { id, UserId },
        returning: true,
      }
    )
      .then((todo) => {
        if (!todo[0]) {
          throw {
            status: 401,
            message: "Un-Authorized",
          };
        } else {
          res.status(200).json(todo[1]);
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteTodo(req, res, next) {
    let id = req.params.id;

    let UserId = req.decoded.id;

    Todo.destroy({ where: { id, UserId }, returning: true })
      .then((todo) => {
        if (!todo) {
          throw {
            status: 401,
            message: "Un-Authorized",
          };
        } else {
          res.status(200).json({ Message: "Deleted !" });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = TodoController;
