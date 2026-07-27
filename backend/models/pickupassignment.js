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
<<<<<<< HEAD
      allowNull: true,
      field: "AssignedDate",
=======
      defaultValue: DataTypes.NOW,
>>>>>>> 693b0d7 (Added today collection and collector profile features)
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