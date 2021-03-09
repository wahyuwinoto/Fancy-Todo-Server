"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User);
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "title tidak boleh kosong",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            args: true,
            msg: "description harus di-isi",
          },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
      due_date: {
        type: DataTypes.DATE,
        validate: {
          isAfter: {
            args: String(new Date()),
            msg: "Tidak diperbolehkan mengisi tanggal yang telah lampau",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
