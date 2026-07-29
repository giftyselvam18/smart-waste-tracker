const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Collector = sequelize.define(
  "Collector",
  {
    CollectorID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "CollectorID",
    },

    CollectorCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "CollectorCode",
    },

    CollectorName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "CollectorName",
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

    VehicleNumber: {
      type: DataTypes.STRING,
      field: "VehicleNumber",
    },

    Area: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Area",
    },
    Status: {
      type: DataTypes.STRING,
      defaultValue: "Available"
    }
    
  },
  {
    tableName: "Collectors",
    timestamps: false,
  }
);

module.exports = Collector;