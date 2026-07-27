const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const PickupAssignment = sequelize.define(
  "PickupAssignment",
  {
    AssignmentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    RequestID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    CollectorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    AssignedDate: {
      type: DataTypes.DATE,

      allowNull: true,
      field: "AssignedDate",

      defaultValue: DataTypes.NOW,

    },

    Status: {
      type: DataTypes.STRING,
      defaultValue: "Assigned",
      field: "Status",
    },
  },
  {
    tableName: "PickupAssignments",
    timestamps: false,
  }
);

module.exports = PickupAssignment;