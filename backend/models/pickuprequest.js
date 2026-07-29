const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const PickupRequest = sequelize.define(
  "PickupRequest",
  {
    requestId: {
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

    wasteType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "WasteType",
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "Weight",
    },

    pickupDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "PickupDate",
    },

    pickupTime: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "PickupTime",
    },

    pickupAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "PickupAddress",
    },

    wasteImage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "WasteImage",
    },

    Description: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Description",
    },

    Status: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "Status",
    },

    RequestDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "RequestDate",
    },
  },
  {
    tableName: "PickupRequests",
    timestamps: false,
  }
);

module.exports = PickupRequest;