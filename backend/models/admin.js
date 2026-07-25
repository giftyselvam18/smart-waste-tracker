const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Admin = sequelize.define(
  "Admin",
  {
    AdminID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "AdminID",
    },

    AdminUsername: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "AdminUsername",
    },

    Password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "Password",
    },

    SecurityCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "SecurityCode",
    },
  },
  {
    tableName: "Admins",
    timestamps: false,
  }
);

module.exports = Admin;