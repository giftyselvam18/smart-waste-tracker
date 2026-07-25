const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
  "User",
  {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "UserID",
    },

    FullName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "FullName",
    },

    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "Username",
    },

    Password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "Password",
    },

    Phone: {
      type: DataTypes.STRING,
      field: "Phone",
    },

    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "Email",
      validate: {
        isEmail: true,
      },
    },

    Address: {
      type: DataTypes.STRING,
      field: "Address",
    },

    CreatedAt: {
      type: DataTypes.DATE,
      field: "CreatedAt",
    },
  },
  {
    tableName: "Users",
    timestamps: false,
  }
);

module.exports = User;