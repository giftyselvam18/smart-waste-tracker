const {
  PickupRequest,
  PickupAssignment,
  Collector,
  User,
  WasteCategory,
} = require("../models");

// ==========================
// Create Pickup Request
// ==========================
exports.createPickupRequest = async (req, res) => {
  try {

    console.log("========== REQUEST BODY ==========");
    console.log(req.body);

    // Waste Type -> CategoryID Mapping
    const categoryMap = {
      Plastic: 1,
      Paper: 2,
      Metal: 3,
      Glass: 4,
      Organic: 5,
      "E-Waste": 6,
    };

    const pickupData = {
      UserID: req.body.UserID,
      CategoryID: categoryMap[req.body.wasteType],
      PickupAddress: req.body.pickupAddress,
      PickupDate: req.body.pickupDate,   // ✅ Add this back
      PickupTime: req.body.pickupTime,
      Weight: req.body.weight,
      Description: req.body.notes,
      Status: "Pending",
      // RequestDate வேண்டாம். SQL Server GETDATE() default use ஆகும்.
    };

    console.log("========== DATA TO INSERT ==========");
    console.log(pickupData);

    const pickup = await PickupRequest.create(pickupData);

    res.status(201).json({
      message: "Pickup Request Created Successfully",
      pickup,
    });

  } catch (error) {

    console.error("========== FULL ERROR ==========");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};
// ==========================
// Get All Pickup Requests
// ==========================
exports.getAllPickupRequests = async (req, res) => {
  try {

    const requests = await PickupRequest.findAll({
      include: [
        User,
        WasteCategory,
      ],
      order: [
        ["RequestID", "DESC"],
      ],
    });

    res.status(200).json(requests);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};
// ==========================
// Get All Pickup Requests
// ==========================
exports.getAllPickupRequests = async (req, res) => {

  try {

    const requests = await PickupRequest.findAll({

      include:[
        User,
        WasteCategory
      ],

      order:[
        ["RequestID","DESC"]
      ]

    });


    res.status(200).json(requests);


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};




// ==========================
// Get Pickup By ID
// ==========================
exports.getPickupRequestById = async(req,res)=>{

  try{

    const pickup = await PickupRequest.findByPk(
      req.params.id,
      {
        include:[
          User,
          WasteCategory
        ]
      }
    );


    if(!pickup){

      return res.status(404).json({
        message:"Pickup Request Not Found"
      });

    }


    res.status(200).json(pickup);



  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};





// ==========================
// Update Pickup Request
// ==========================
exports.updatePickupRequest = async(req,res)=>{

  try{


    const pickup = await PickupRequest.findByPk(
      req.params.id
    );


    if(!pickup){

      return res.status(404).json({
        message:"Pickup Request Not Found"
      });

    }


    await pickup.update(req.body);


    res.status(200).json({

      message:"Pickup Request Updated Successfully",
      pickup

    });



  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};





// ==========================
// Delete Pickup Request
// ==========================
exports.deletePickupRequest = async(req,res)=>{

  try{


    const pickup = await PickupRequest.findByPk(
      req.params.id
    );


    if(!pickup){

      return res.status(404).json({
        message:"Pickup Request Not Found"
      });

    }


    await pickup.destroy();


    res.status(200).json({

      message:"Pickup Request Deleted Successfully"

    });



  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};





// ==========================
// Assign Collector
// ==========================
exports.assignCollector = async (req, res) => {

  try {

    const {
      RequestID,
      CollectorID
    } = req.body;


    console.log("Assign Data:", req.body);


    // Check RequestID and CollectorID
    if (!RequestID || !CollectorID) {

      return res.status(400).json({
        message: "RequestID and CollectorID are required"
      });

    }



    // Check Pickup Request

    const pickup = await PickupRequest.findByPk(
      RequestID
    );


    if (!pickup) {

      return res.status(404).json({
        message: "Pickup Request Not Found"
      });

    }



    // Check Collector

    const collector = await Collector.findByPk(
      CollectorID
    );


    if (!collector) {

      return res.status(404).json({
        message: "Collector Not Found"
      });

    }



    // Check Already Assigned

    const existingAssignment = await PickupAssignment.findOne({

      where: {

        RequestID: Number(RequestID),

        Status: "Assigned"

      }

    });



    if (existingAssignment) {

      return res.status(400).json({

        message: "Pickup Already Assigned"

      });

    }



    // Create Assignment
    // AssignedDate removed because SQL Server datetime conversion issue

    const assignment = await PickupAssignment.create({

      RequestID: Number(RequestID),

      CollectorID: Number(CollectorID),

      Status: "Assigned"

    });



    // Update Pickup Status

    await pickup.update({

      Status: "Assigned"

    });



    // Update Collector Status

    await collector.update({

      Status: "Busy"

    });



    res.status(201).json({

      message: "Collector Assigned Successfully",

      assignment

    });



  } catch (error) {


    console.error("ASSIGN ERROR:", error);


    res.status(500).json({

      message: error.message

    });


  }

};
// ==========================
// Get All Assignments
// ==========================
exports.getAllAssignments = async(req,res)=>{


try{


const assignments = await PickupAssignment.findAll({

include:[

 Collector,

 {

  model:PickupRequest,

  include:[
    User,
    WasteCategory
  ]

 }

],

order:[
 ["AssignmentID","DESC"]
]


});



res.status(200).json(assignments);



}catch(error){

res.status(500).json({

 message:error.message

});


}


};







// ==========================
// Get Assignment By ID
// ==========================
exports.getAssignmentById = async(req,res)=>{


try{


const assignment = await PickupAssignment.findByPk(

req.params.id,

{

include:[

Collector,

{

model:PickupRequest,

include:[
 User,
 WasteCategory
]

}

]

}


);



if(!assignment){

return res.status(404).json({

message:"Assignment Not Found"

});

}



res.status(200).json(assignment);



}catch(error){

res.status(500).json({

message:error.message

});

}


};







// ==========================
// Delete Assignment
// ==========================
exports.deleteAssignment = async(req,res)=>{


try{


const assignment = await PickupAssignment.findByPk(
 req.params.id
);



if(!assignment){

return res.status(404).json({

message:"Assignment Not Found"

});

}



await assignment.destroy();



res.status(200).json({

message:"Assignment Deleted Successfully"

});



}catch(error){

res.status(500).json({

message:error.message

});

}


};







// ==========================
// Collector Dashboard Requests
// ==========================
exports.getCollectorRequests = async(req,res)=>{


try{


const requests = await PickupAssignment.findAll({

where:{
 CollectorID:req.params.id
},


include:[

Collector,

{

model:PickupRequest,

include:[
 User,
 WasteCategory
]

}

]


});



res.status(200).json(requests);



}catch(error){

res.status(500).json({

message:error.message

});


}


};







// ==========================
// Start Pickup
// ==========================
exports.startPickup = async (req, res) => {

  try {

    const { RequestID } = req.params;


    console.log("Starting Pickup ID:", RequestID);



    // Check Pickup Request

    const pickup = await PickupRequest.findByPk(RequestID);


    if (!pickup) {

      return res.status(404).json({
        message: "Pickup Request Not Found"
      });

    }



    // Update Pickup Status

    await pickup.update({

      Status: "Started"

    });



    // Update Assignment Status

    await PickupAssignment.update(

      {
        Status: "Started"
      },

      {
        where: {
          RequestID: RequestID
        }
      }

    );



    res.status(200).json({

      message: "Pickup Started Successfully"

    });



  } catch (error) {


    console.log("START PICKUP ERROR:", error);


    res.status(500).json({

      message: error.message

    });


  }

};







// ==========================
// Complete Pickup
// ==========================
exports.completePickup = async (req, res) => {

  try {

    const { id } = req.params;


    const pickup = await PickupRequest.findByPk(id);


    if (!pickup) {
      return res.status(404).json({
        message: "Pickup Request Not Found"
      });
    }


    await pickup.update({
      Status: "Completed"
    });


    res.status(200).json({
      message: "Pickup Completed Successfully",
      pickup
    });


  } catch(error) {

    console.error("COMPLETE PICKUP ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

};

// ==========================
// Today's Collection
// ==========================
exports.getTodayCollection = async(req,res)=>{


try{


const today = new Date()
.toISOString()
.split("T")[0];



const collections = await PickupRequest.findAll({

where:{

Status:"Completed",

PickupDate:today

}


});




res.status(200).json({

totalCollection:collections.length,

collections

});




}catch(error){


res.status(500).json({

message:error.message

});


}


};