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

      wasteType: req.body.wasteType,

      weight: req.body.weight,

      pickupDate: req.body.pickupDate,

      pickupTime: req.body.pickupTime,

      pickupAddress: req.body.pickupAddress,

      WasteImage: req.body.wasteImage || null,

      CategoryID: categoryMap[req.body.wasteType],

      Description: req.body.notes || "",

      Status: "Pending"

    };


    console.log("========== INSERT DATA ==========");
    console.log(pickupData);



    const pickup = await PickupRequest.create(
      pickupData
    );


    res.status(201).json({

      message:"Pickup Request Created Successfully",

      pickup

    });



  } catch(error){


    console.error(
      "CREATE PICKUP ERROR:",
      error
    );


    res.status(500).json({

      message:error.message

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
        {
          model: User,
          attributes: ["UserID", "FullName"],
        },
        {
          model: WasteCategory,
          attributes: ["CategoryID", "CategoryName"],
        },
      ],
      order: [["requestId", "DESC"]], // model attribute name
    });

    console.log(JSON.stringify(requests, null, 2));

    res.status(200).json(requests);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
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
    const { RequestID, CollectorID } = req.body;

    console.log("Assign Data:", req.body);

    if (!RequestID || !CollectorID) {
      return res.status(400).json({
        message: "RequestID and CollectorID are required",
      });
    }

    const pickup = await PickupRequest.findByPk(RequestID);

    if (!pickup) {
      return res.status(404).json({
        message: "Pickup Request Not Found",
      });
    }

    const collector = await Collector.findByPk(CollectorID);

    if (!collector) {
      return res.status(404).json({
        message: "Collector Not Found",
      });
    }

    const existingAssignment = await PickupAssignment.findOne({
      where: {
        RequestID: Number(RequestID),
        Status: "Assigned",
      },
    });

    if (existingAssignment) {
      return res.status(400).json({
        message: "Pickup Already Assigned",
      });
    }

    const assignment = await PickupAssignment.create({
      RequestID: Number(RequestID),
      CollectorID: Number(CollectorID),
      Status: "Assigned",
    });

    await pickup.update({
      Status: "Assigned",
    });

    await collector.update({
      Status: "Busy",
    });

    res.status(201).json({
      message: "Collector Assigned Successfully",
      assignment,
    });

  } catch (error) {

    console.log("========== ASSIGN ERROR ==========");

    console.error(error);

    console.log("Message:", error.message);

    console.log("SQL:", error.sql);

    console.log("Parameters:", error.parameters);

    if (error.parent?.errors) {
      console.log("========== SQL SERVER ERRORS ==========");

      error.parent.errors.forEach((err) => {
        console.log(err.message);
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};





// =========================
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
    model: PickupRequest,

    include:[
      User,
      WasteCategory
    ]

  }

]


});



// Check response data
console.log(
  "COLLECTOR REQUEST DATA:",
  JSON.stringify(requests, null, 2)
);



res.status(200).json(requests);



}catch(error){


console.log(
  "GET COLLECTOR REQUEST ERROR:",
  error
);


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


    const pickup = await PickupRequest.findByPk(RequestID);


    if (!pickup) {

      return res.status(404).json({
        message: "Pickup Request Not Found"
      });

    }


    // Update pickup request status
    await pickup.update({
      Status: "Started"
    });


    // Update assignment status
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

      message: "Pickup Started Successfully",
      status: "Started"

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

    console.log("Completing Pickup ID:", id);


    const pickup = await PickupRequest.findByPk(id);


    if (!pickup) {

      return res.status(404).json({
        message: "Pickup Request Not Found"
      });

    }


    // Find assignment before updating
    const assignment = await PickupAssignment.findOne({
      where:{
        RequestID: id
      }
    });


    // Update Pickup Request Status
    await pickup.update({
      Status: "Completed"
    });



    // Update Assignment Status
    await PickupAssignment.update(
      {
        Status: "Completed"
      },
      {
        where:{
          RequestID: id
        }
      }
    );



    // Make Collector Available again
    if(assignment){

      await Collector.update(
        {
          Status:"Available"
        },
        {
          where:{
            CollectorID: assignment.CollectorID
          }
        }
      );

    }



    res.status(200).json({

      message:"Pickup Completed Successfully",

      status:"Completed"

    });



  } catch(error) {


    console.error(
      "COMPLETE PICKUP ERROR:",
      error
    );


    res.status(500).json({

      message:error.message

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
// ==========================
// Get User Pickup History / Track Status
// ==========================
exports.getUserPickups = async (req, res) => {

  try {

    const { id } = req.params;


    const pickups = await PickupRequest.findAll({

      where: {
        UserID: id
      },


      include: [

        {
          model: WasteCategory,
          attributes: [
            "CategoryID",
            "CategoryName"
          ]
        }

      ],


      order: [
        ["RequestID", "DESC"]
      ]

    });



    res.status(200).json(pickups);



  } catch (error) {


    console.error(
      "GET USER PICKUPS ERROR:",
      error
    );


    res.status(500).json({

      message: error.message

    });


  }

};