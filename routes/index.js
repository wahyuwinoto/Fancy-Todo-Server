const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const todoRouter = require("./todo");
const ApiController = require("../controllers/api-controller");

router.post("/sendmail", function (req, res) {});

router.get("/katabijak", ApiController.kataBijak);
router.get("/airvisual", ApiController.airvisual);
router.use("/", userRouter);
router.use("/todo", todoRouter);

module.exports = router;
