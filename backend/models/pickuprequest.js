const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const PickupRequest = sequelize.define(
  "PickupRequest",
  {
    RequestID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "RequestID",
    },

    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UserID",
    },

    CategoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "CategoryID",
    },

    PickupAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "PickupAddress",
    },

    PickupDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "PickupDate",
    },

    Description: {
      type: DataTypes.STRING,
      field: "Description",
    },

    Status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
      field: "Status",
    },

    RequestDate: {
      type: DataTypes.DATE,
      field: "RequestDate",
    },
  },
  {
    tableName: "PickupRequests",
    timestamps: false,
  }
);

module.exports = PickupRequest;