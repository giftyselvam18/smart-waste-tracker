require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const { sequelize, connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const collectorRoutes = require("./routes/collectorRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const pickupRoutes = require("./routes/pickupRoutes");

// Load all models & associations
require("./models");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/collector", require("./routes/collector"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/collectors", collectorRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/pickups", pickupRoutes);

const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("driverLocationUpdate", (location) => {
    io.emit("truckMoved", location);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(async () => {
    await sequelize.sync({ alter: false });

    console.log("✅ Database Connected");
    console.log("✅ Models Loaded");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Server Start Failed:", err);

    if (err.parent?.errors) {
      err.parent.errors.forEach((e, i) => {
        console.error(`SQL Error ${i + 1}:`, e.message);
      });
    }
  });