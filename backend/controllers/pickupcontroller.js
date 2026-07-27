const {
  PickupRequest,
  PickupAssignment,
  User,
  WasteCategory,
} = require("../models");


// =========================
// Pickup Request
// =========================


// Create Pickup Request
exports.createPickupRequest = async (req, res) => {
  try {

    const pickup = await PickupRequest.create(req.body);

    res.status(201).json({
      message: "Pickup request created successfully",
      pickup,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// Get All Pickup Requests
exports.getAllPickupRequests = async (req, res) => {

  try {

    const pickups = await PickupRequest.findAll({

      include: [

        {
          model: User,
          attributes: [
            "FullName",
            "Username",
            "Phone"
          ]
        },


        {
          model: WasteCategory,
          attributes: [
            "CategoryName"
          ]
        }

      ]

    });


    res.status(200).json(pickups);


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// Get Pickup Request By ID
exports.getPickupRequestById = async (req, res) => {

  try {

    const pickup = await PickupRequest.findByPk(
      req.params.id,
      {
        include:[
          {
            model:User,
            attributes:["FullName"]
          },
          {
            model:WasteCategory,
            attributes:["CategoryName"]
          }
        ]
      }
    );


    if (!pickup) {

      return res.status(404).json({
        message:"Pickup request not found",
      });

    }


    res.status(200).json(pickup);


  } catch(error){

    res.status(500).json({
      message:error.message,
    });

  }

};



// Update Pickup Request
exports.updatePickupRequest = async (req, res) => {

  try {

    const pickup = await PickupRequest.findByPk(req.params.id);


    if(!pickup){

      return res.status(404).json({
        message:"Pickup request not found",
      });

    }


    await pickup.update(req.body);


    res.status(200).json({

      message:"Pickup request updated successfully",
      pickup,

    });


  }catch(error){

    res.status(500).json({
      message:error.message,
    });

  }

};



// Delete Pickup Request
exports.deletePickupRequest = async (req,res)=>{

try{

const pickup = await PickupRequest.findByPk(req.params.id);


if(!pickup){

return res.status(404).json({
message:"Pickup request not found"
});

}


await pickup.destroy();


res.status(200).json({
message:"Pickup request deleted successfully"
});


}catch(error){

res.status(500).json({
message:error.message
});

}

};




// =========================
// Pickup Assignment
// =========================


// Assign Collector
exports.assignCollector = async(req,res)=>{

try{

const assignment = await PickupAssignment.create({

RequestID:req.body.RequestID,

CollectorID:req.body.CollectorID,

AssignedDate:new Date(),

});



await PickupRequest.update(

{
Status:"Assigned"
},

{
where:{
RequestID:req.body.RequestID
}
}

);



res.status(201).json({

message:"Collector assigned successfully",

assignment

});


}catch(error){

res.status(500).json({

message:error.message

});

}

};



// Get All Assignments
exports.getAllAssignments = async(req,res)=>{

try{

const assignments = await PickupAssignment.findAll();


res.status(200).json(assignments);


}catch(error){

res.status(500).json({
message:error.message
});

}

};



// Get Assignment By ID
exports.getAssignmentById = async(req,res)=>{

try{

const assignment =
await PickupAssignment.findByPk(req.params.id);


if(!assignment){

return res.status(404).json({
message:"Assignment not found"
});

}


res.status(200).json(assignment);


}catch(error){

res.status(500).json({
message:error.message
});

}

};



// Delete Assignment
exports.deleteAssignment = async(req,res)=>{

try{

const assignment =
await PickupAssignment.findByPk(req.params.id);


if(!assignment){

return res.status(404).json({
message:"Assignment not found"
});

}


await assignment.destroy();


res.status(200).json({

message:"Assignment deleted successfully"

});


}catch(error){

res.status(500).json({
message:error.message
});

}

};