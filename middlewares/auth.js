const { verifyToken } = require("../helper/jwt");
const { User, Todo } = require("../models");

async function authenticate(req, res, next) {
  try {
    const token = req.headers.access_token;

    const decoded = verifyToken(token);

    req.decoded = decoded;

    let user = await User.findOne({ where: { email: decoded.email } });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (user) {
      req.user = { id: user.id };
      return next();
    }
  } catch (err) {
    res.status(401).json({ message: "invalid token" });
  }
}

async function authorize(req, res, next) {
  try {
    const id = req.params.id;
    const UserId = req.decoded.id;

    const data = await Todo.findAll({
      where: { id, UserId },
    });
    console.log("data: di authhhh ", data);

    if (!data)
      throw {
        status: 404,
        msg: "id not found",
      };

    next();
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json({ msg: err.msg });
    } else if (err.status === 401) {
      res.status(401).json({ msg: err.msg });
    } else {
      res.status(500).json({});
    }
  }
}

module.exports = { authenticate, authorize };
