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

    const pickup = await PickupRequest.create(req.body);

    res.status(201).json({
      message: "Pickup Request Created Successfully",
      pickup,
    });

  } catch (error) {

    console.log(error);

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

      order: [["RequestID", "DESC"]],

    });


    res.json(requests);


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
exports.getPickupRequestById = async (req, res) => {

  try {

    const request = await PickupRequest.findByPk(
      req.params.id,
      {
        include: [
          User,
          WasteCategory
        ],
      }
    );


    if (!request) {

      return res.status(404).json({
        message:"Pickup Request Not Found",
      });

    }


    res.json(request);


  } catch(error) {

    console.log(error);

    res.status(500).json({
      message:error.message,
    });

  }

};



// ==========================
// Update Pickup Request
// ==========================
exports.updatePickupRequest = async(req,res)=>{

  try{

    const request = await PickupRequest.findByPk(req.params.id);


    if(!request){

      return res.status(404).json({
        message:"Pickup Request Not Found",
      });

    }


    await request.update(req.body);


    res.json({

      message:"Pickup Request Updated Successfully",
      request,

    });


  }catch(error){

    console.log(error);

    res.status(500).json({
      message:error.message,
    });

  }

};



// ==========================
// Delete Pickup Request
// ==========================
exports.deletePickupRequest = async(req,res)=>{

 try{

  const request = await PickupRequest.findByPk(req.params.id);


  if(!request){

    return res.status(404).json({
      message:"Pickup Request Not Found",
    });

  }


  await request.destroy();


  res.json({

    message:"Pickup Request Deleted Successfully",

  });


 }catch(error){

  console.log(error);

  res.status(500).json({
    message:error.message,
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


    console.log("Assign Request:", req.body);



    // Check Pickup Request
    const pickup = await PickupRequest.findByPk(RequestID);


    if (!pickup) {

      return res.status(404).json({

        message: "Pickup Request Not Found",

      });

    }



    // Check Collector
    const collector = await Collector.findByPk(CollectorID);


    if (!collector) {

      return res.status(404).json({

        message: "Collector Not Found",

      });

    }



    // Check already assigned
    const existingAssignment = await PickupAssignment.findOne({

      where:{
        RequestID: RequestID,
        Status:"Assigned"
      }

    });



    if(existingAssignment){

      return res.status(400).json({

        message:"Pickup Already Assigned"

      });

    }




    // Create Assignment
    const assignment = await PickupAssignment.create({

      RequestID: RequestID,

      CollectorID: CollectorID,

      AssignedDate: new Date(),

      Status:"Assigned",

    });





    // Change Collector Status Busy
    

const updateStatus = await Collector.update(
  {
    Status:"Busy"
  },
  {
    where:{
      CollectorID: CollectorID
    }
  }
);


console.log("STATUS UPDATE RESULT:", updateStatus);


    // Change Pickup Status
    await pickup.update({

      Status:"Assigned"

    });





    res.status(200).json({

      message:"Collector Assigned Successfully",

      assignment

    });



  }
  catch(error){

    console.log("ASSIGN ERROR:", error.message);

    console.log(error.original);


    res.status(500).json({

      message:error.message

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
        ],

      },

    ],


    order:[
      ["AssignmentID","DESC"]
    ],


  });



  res.json(assignments);



 }catch(error){


  console.log(error);


  res.status(500).json({

    message:error.message,

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
          ],

        },

      ],

    }

  );



  if(!assignment){

    return res.status(404).json({

      message:"Assignment Not Found",

    });

  }



  res.json(assignment);



 }catch(error){


  console.log(error);


  res.status(500).json({

    message:error.message,

  });


 }

};






// ==========================
// Delete Assignment
// ==========================
exports.deleteAssignment = async(req,res)=>{

 try{


  const assignment = await PickupAssignment.findByPk(req.params.id);



  if(!assignment){

    return res.status(404).json({

      message:"Assignment Not Found",

    });

  }



  await assignment.destroy();



  res.json({

    message:"Assignment Deleted Successfully",

  });



 }catch(error){


  console.log(error);


  res.status(500).json({

    message:error.message,

  });


 }

};






// ==========================
// Collector Dashboard
// ==========================
exports.getCollectorRequests = async(req,res)=>{

 try{


  const collectorId = req.params.id;



  const requests = await PickupAssignment.findAll({

    where:{

      CollectorID:collectorId,

    },


    include:[

      Collector,

      {

        model:PickupRequest,

        include:[
          User,
          WasteCategory
        ],

      },

    ],


  });



  res.json(requests);



 }catch(error){


  console.log(error);



  res.status(500).json({

    message:error.message,

  });


 }

};
// ==========================
// Complete Pickup
// ==========================
exports.completePickup = async(req,res)=>{

 try{

    const { AssignmentID } = req.body;


    // Find Assignment

    const assignment = await PickupAssignment.findByPk(
      AssignmentID
    );


    if(!assignment){

      return res.status(404).json({

        message:"Assignment Not Found",

      });

    }



    // Update Assignment Status

    await assignment.update({

      Status:"Completed",

    });
    // Change Collector Status back to Available

const collector = await Collector.findByPk(
  assignment.CollectorID
);


if(collector){

  await collector.update({

    Status:"Available"

  });

}




    // Update Pickup Request Status

    await PickupRequest.update(

      {
        Status:"Completed",
      },

      {
        where:{
          RequestID: assignment.RequestID,
        },
      }

    );




    res.json({

      message:"Pickup Completed Successfully",

    });



 }catch(error){


    console.log(error);


    res.status(500).json({

      message:error.message,

    });


 }

};