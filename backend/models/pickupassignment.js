const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const PickupAssignment = sequelize.define(
  "PickupAssignment",
  {
    AssignmentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "AssignmentID",
    },

    RequestID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "RequestID",
    },

    CollectorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "CollectorID",
    },

    AssignedDate: {
      type: DataTypes.DATE,
      field: "AssignedDate",
    },
  },
  {
    tableName: "PickupAssignments",
    timestamps: false,
  }
);

module.exports = PickupAssignment;