const jwt = require("jsonwebtoken");

const {
  Collector,
  PickupAssignment,
  PickupRequest,
  WasteCategory,
} = require("../models");

// =========================
// Get Assigned Pickups
// =========================
exports.getAssignedPickups = async (req, res) => {
  try {
    const { collectorId } = req.params;

    const pickups = await PickupAssignment.findAll({
      where: {
        CollectorID: collectorId,
      },
    });

    res.status(200).json(pickups);
  } catch (error) {
    console.error("Get Assigned Pickups Error:", error);

    if (error.parent && error.parent.errors) {
      console.log(error.parent.errors);
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Start Pickup
// =========================
exports.startPickup = async (req, res) => {
  try {
    const { requestId } = req.params;

    const pickup = await PickupRequest.findByPk(requestId);

    if (!pickup) {
      return res.status(404).json({
        message: "Pickup Request not found",
      });
    }

    await pickup.update({
      Status: "In Progress",
    });

    res.status(200).json({
      message: "Pickup Started Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// =========================
// Collector Login
// =========================
exports.login = async (req, res) => {
  try {

    const { username, password } = req.body;

    const collector = await Collector.findOne({
      where:{
        Username: username
      }
    });


    if(!collector){
      return res.status(404).json({
        message:"Collector not found"
      });
    }


    if(collector.Password !== password){
      return res.status(401).json({
        message:"Invalid password"
      });
    }


    const token = jwt.sign(
      {
        id: collector.CollectorID,
        role:"collector"
      },
      process.env.JWT_SECRET,
      {
        expiresIn:"1d"
      }
    );


    res.json({
      message:"Login successful",
      token,
      collector
    });


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};


// =========================
// Get All Collectors
// =========================
exports.getAllCollectors = async(req,res)=>{
  try{

    const collectors = await Collector.findAll();

    res.json(collectors);

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};


// =========================
// Get Collector By ID
// =========================
exports.getCollectorById = async(req,res)=>{
  try{

    const collector = await Collector.findByPk(req.params.id);


    if(!collector){
      return res.status(404).json({
        message:"Collector not found"
      });
    }


    res.json(collector);


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};


// =========================
// Create Collector
// =========================
exports.createCollector = async(req,res)=>{
  try{

    const collector = await Collector.create(req.body);

    res.status(201).json(collector);


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};


// =========================
// Update Collector
// =========================
exports.updateCollector = async(req,res)=>{
  try{

    await Collector.update(
      req.body,
      {
        where:{
          CollectorID:req.params.id
        }
      }
    );


    res.json({
      message:"Collector updated"
    });


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};


// =========================
// Delete Collector
// =========================
exports.deleteCollector = async(req,res)=>{
  try{

    await Collector.destroy({
      where:{
        CollectorID:req.params.id
      }
    });


    res.json({
      message:"Collector deleted"
    });


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};