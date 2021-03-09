require("dotenv").config();
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const router = require("./routes");
const errHandler = require("./middlewares/errHandler");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use("/", router);
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`Fancy ToDo app listening at http://localhost:${PORT}`);
});
