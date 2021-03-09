"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "name tidak boleh kosong",
          },
          len: {
            args: [5],
            msg: "name minimal 5 karakter",
          },
        },
        unique: true,
      },

      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Email harus di-isi",
          },
          isEmail: {
            msg: "Email tidak valid",
          },
        },
        unique: true,
      },

      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password wajib di-isi",
          },
          len: {
            args: [8],
            msg: "Password minimal 8 karakter",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (instance) => {
          instance.password = hashPassword(instance.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
