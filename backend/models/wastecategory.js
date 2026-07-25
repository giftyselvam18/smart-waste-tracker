const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const WasteCategory = sequelize.define(
  "WasteCategory",
  {
    CategoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "CategoryID",
    },

    CategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "CategoryName",
    },

    Description: {
      type: DataTypes.STRING,
      field: "Description",
    },
  },
  {
    tableName: "WasteCategories",
    timestamps: false,
  }
);

module.exports = WasteCategory;