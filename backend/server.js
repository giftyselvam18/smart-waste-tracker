require("dotenv").config();

const express = require("express");
const aiRoutes = require("./routes/aiRoutes");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const { sequelize, connectDB } = require("./config/db");


// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const collectorRoutes = require("./routes/collectorRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const pickupRoutes = require("./routes/pickupRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


// Load Models & Associations
require("./models");


const app = express();



// Middleware

app.use(cors());

app.use(express.json());



// AI Routes

app.use(
  "/api/ai",
  aiRoutes
);


// Upload folder

app.use(
  "/uploads",
  express.static("uploads")
);




// Test Route

app.get("/", (req,res)=>{

  res.send("Smart Waste Tracker Backend Running");

});




// API Routes

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/collectors", collectorRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/pickups", pickupRoutes);


// Dashboard Stats Route

app.use(
  "/api/dashboard",
  dashboardRoutes
);




// HTTP Server

const server = http.createServer(app);




// Socket.IO Setup

const io = new Server(server,{

  cors:{
    origin:"*",
    methods:["GET","POST"]
  }

});





io.on("connection",(socket)=>{


  console.log(
    "User Connected:",
    socket.id
  );



  socket.on(
    "driverLocationUpdate",
    (location)=>{

      io.emit(
        "truckMoved",
        location
      );

    }
  );



  socket.on(
    "disconnect",
    ()=>{

      console.log(
        "User Disconnected:",
        socket.id
      );

    }
  );


});




// Port

const PORT = process.env.PORT || 5000;





// Database Connection + Server Start

connectDB()

.then(async()=>{


  await sequelize.sync({
    alter:false
  });



  console.log("✅ Database Connected");

  console.log("✅ Models Loaded");



  server.listen(PORT,()=>{


    console.log(
      `🚀 Server running on http://localhost:${PORT}`
    );


  });


})


.catch((err)=>{


  console.error(
    "❌ Server Start Failed:",
    err
  );



  if(err.parent?.errors){


    err.parent.errors.forEach((e,i)=>{


      console.error(
        `SQL Error ${i+1}:`,
        e.message
      );


    });


  }


});