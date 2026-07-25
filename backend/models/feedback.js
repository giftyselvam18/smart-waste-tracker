const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Feedback = sequelize.define(
  "Feedback",
  {
    FeedbackID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "FeedbackID",
    },

    RequestID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "RequestID",
    },

    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UserID",
    },

    Rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "Rating",
      validate: {
        min: 1,
        max: 5,
      },
    },

    Comments: {
      type: DataTypes.STRING,
      field: "Comments",
    },

    FeedbackDate: {
      type: DataTypes.DATE,
      field: "FeedbackDate",
    },
  },
  {
    tableName: "Feedback",
    timestamps: false,
  }
);

module.exports = Feedback;