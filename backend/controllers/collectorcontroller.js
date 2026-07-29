const jwt = require("jsonwebtoken");

const {
  Collector,
  PickupAssignment,
  PickupRequest,
  WasteCategory,
  User,
} = require("../models");

// =========================
// Get Assigned Pickups
// =========================
exports.getAssignedPickups = async (req, res) => {
  try {
    const { collectorId } = req.params;

    const pickups = await PickupAssignment.findAll({
      where: {
        CollectorID: Number(collectorId),
      },

      include: [
        {
          model: PickupRequest,

          include: [
            {
              model: User,
              attributes: ["UserID", "FullName"],
            },
            {
              model: WasteCategory,
              attributes: ["CategoryID", "CategoryName"],
            },
          ],
        },
      ],

      order: [["AssignmentID", "DESC"]],
    });

    res.status(200).json(pickups);
  } catch (error) {
    console.error("Get Assigned Pickups Error:", error);

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
        message:"Pickup Request not found",
      });

    }


    // Update Pickup Request Status
    await pickup.update({

      Status:"In Progress"

    });



    // Update Assignment Status
    await PickupAssignment.update(

      {
        Status:"In Progress"
      },

      {
        where:{
          RequestID:requestId
        }
      }

    );



    res.json({

      message:"Pickup Started Successfully"

    });



  } catch(error) {


    console.error(
      "START PICKUP ERROR:",
      error
    );


    res.status(500).json({

      message:error.message

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
      where: {
            CollectorCode: username

      },
    });

    if (!collector) {
      return res.status(404).json({
        message: "Collector not found",
      });
    }

    if (collector.Password !== password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: collector.CollectorID,
        role: "collector",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      collector,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Get All Collectors
// =========================
exports.getAllCollectors = async (req, res) => {
  try {
    const collectors = await Collector.findAll();

    res.json(collectors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Get Collector By ID
// =========================
exports.getCollectorById = async (req, res) => {
  try {
    const collector = await Collector.findByPk(req.params.id);

    if (!collector) {
      return res.status(404).json({
        message: "Collector not found",
      });
    }

    res.json(collector);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Create Collector
// =========================
exports.createCollector = async (req, res) => {
  try {

    const collector = await Collector.create({

      ...req.body,

      Status:"Available"

    });


    res.status(201).json(collector);


  } catch (error) {

    res.status(500).json({
      message:error.message
    });

  }
};

// =========================
// Update Collector
// =========================
exports.updateCollector = async (req, res) => {
  try {
    await Collector.update(req.body, {
      where: {
        CollectorID: req.params.id,
      },
    });

    res.json({
      message: "Collector updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Delete Collector
// =========================
exports.deleteCollector = async (req, res) => {
  try {
    await Collector.destroy({
      where: {
        CollectorID: req.params.id,
      },
    });

    res.json({
      message: "Collector deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};