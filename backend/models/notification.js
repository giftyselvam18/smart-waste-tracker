const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Notification = sequelize.define(
  "Notification",
  {
    NotificationID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "NotificationID",
    },

    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UserID",
    },

    Message: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "Message",
    },

    IsRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "IsRead",
    },

    CreatedAt: {
      type: DataTypes.DATE,
      field: "CreatedAt",
    },
  },
  {
    tableName: "Notifications",
    timestamps: false,
  }
);

module.exports = Notification;