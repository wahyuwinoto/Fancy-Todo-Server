const bcrypt = require("bcrypt");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  console.log(password, salt);
  const hash = bcrypt.hashSync(password, salt);
  console.log("hash: ", hash);

  return hash;
}

function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports = { hashPassword, comparePassword };
