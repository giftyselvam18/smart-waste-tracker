const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    dialect: "mssql",
    logging: false,
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to SQL Server");
  } catch (err) {
    console.error("❌ Database Connection Failed:", err);
    throw err;
  }
};

module.exports = {
  sequelize,
  connectDB,
};