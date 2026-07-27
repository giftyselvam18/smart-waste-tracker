const {
  PickupRequest,
  PickupAssignment,
  Collector,
  User,
  WasteCategory,
} = require("../models");



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
=======
    console.error(error);


    res.status(500).json({
      message: error.message,
    });

  }

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

=======
  try {

    const pickups = await PickupRequest.findAll();

    res.status(200).json(pickups);

  } catch (error) {

>>>>>>> 693b0d7 (Added today collection and collector profile features)
    res.status(500).json({
      message: error.message,
    });

  }

};



<<<<<<< HEAD
// ==========================
// Get Pickup By ID
// ==========================
=======
// Get Pickup Request By ID
>>>>>>> 693b0d7 (Added today collection and collector profile features)
exports.getPickupRequestById = async (req, res) => {

  try {
<<<<<<< HEAD

    const request = await PickupRequest.findByPk(
      req.params.id,
      {
        include: [
          User,
          WasteCategory
        ],
=======

    const pickup = await PickupRequest.findByPk(req.params.id);


    if (!pickup) {

      return res.status(404).json({
        message: "Pickup request not found",
      });

    }


    res.status(200).json(pickup);


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




// Update Pickup Request
exports.updatePickupRequest = async (req, res) => {

  try {

    const pickup = await PickupRequest.findByPk(req.params.id);


    if (!pickup) {

      return res.status(404).json({
        message: "Pickup request not found",
      });

    }


    await pickup.update(req.body);


    res.status(200).json({

      message: "Pickup request updated successfully",

      pickup,

    });


  } catch(error) {

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


    const { RequestID, CollectorID } = req.body;



    // Check duplicate assignment
    const existingAssignment = await PickupAssignment.findOne({

      where:{

        RequestID,

        CollectorID

      }

    });



    if(existingAssignment){

      return res.status(400).json({

        message:"Pickup already assigned to this collector"

      });

    }




    // Create Assignment
    const assignment = await PickupAssignment.create({

      RequestID,

      CollectorID,

      AssignedDate:new Date(),

    });





    // Update Pickup Status
    await PickupRequest.update(

      {

        Status:"Assigned"

      },

      {

        where:{

          RequestID

        }

>>>>>>> 693b0d7 (Added today collection and collector profile features)
      }

    );

<<<<<<< HEAD

    if (!request) {

      return res.status(404).json({
        message:"Pickup Request Not Found",
=======




    res.status(201).json({

      message:"Collector assigned successfully",

      assignment

    });



  }catch(error){


    console.error("Assign Collector Error:", error);


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


    const assignment = await PickupAssignment.findByPk(req.params.id);



    if(!assignment){

      return res.status(404).json({

        message:"Assignment not found"

>>>>>>> 693b0d7 (Added today collection and collector profile features)
      });

    }


<<<<<<< HEAD
    res.json(request);


  } catch(error) {

    console.log(error);

    res.status(500).json({
      message:error.message,
    });

=======

    res.status(200).json(assignment);



  }catch(error){


    res.status(500).json({

      message:error.message

    });


>>>>>>> 693b0d7 (Added today collection and collector profile features)
  }

};

<<<<<<< HEAD


// ==========================
// Update Pickup Request
// ==========================
exports.updatePickupRequest = async(req,res)=>{

  try{

    const request = await PickupRequest.findByPk(req.params.id);


    if(!request){

      return res.status(404).json({
        message:"Pickup Request Not Found",
=======




// Delete Assignment
exports.deleteAssignment = async(req,res)=>{


  try{


    const assignment = await PickupAssignment.findByPk(req.params.id);



    if(!assignment){

      return res.status(404).json({

        message:"Assignment not found"

>>>>>>> 693b0d7 (Added today collection and collector profile features)
      });

    }


<<<<<<< HEAD
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




=======

    await assignment.destroy();
>>>>>>> 693b0d7 (Added today collection and collector profile features)



    res.status(200).json({

<<<<<<< HEAD
      message:"Collector Assigned Successfully",

      assignment
=======
      message:"Assignment deleted successfully"

    });



  }catch(error){


    res.status(500).json({

      message:error.message
>>>>>>> 693b0d7 (Added today collection and collector profile features)

    });


<<<<<<< HEAD

  }
  catch(error){

    console.log("ASSIGN ERROR:", error.message);

    console.log(error.original);
=======
  }

};





// =========================
// Start Pickup
// =========================


exports.startPickup = async(req,res)=>{


  try{


    const pickup = await PickupRequest.findByPk(req.params.id);



    if(!pickup){

      return res.status(404).json({

        message:"Pickup request not found"

      });

    }




    await pickup.update({

      Status:"On the Way"

    });





    res.status(200).json({

      message:"Pickup started successfully",

      pickup

    });




  }catch(error){


    console.error("Start Pickup Error:",error);

>>>>>>> 693b0d7 (Added today collection and collector profile features)


    res.status(500).json({

      message:error.message

    });

<<<<<<< HEAD
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

=======

  }


};

// =========================
// Today's Collection
// =========================

exports.getTodayCollection = async (req, res) => {

  try {

    const today = new Date().toISOString().split("T")[0];


    const collections = await PickupRequest.findAll({

      where: {

        Status: "Completed",

        PickupDate: today

      }

    });


    res.status(200).json({

      totalCollection: collections.length,

      collections

    });


  } catch(error) {


    console.error(error);


    res.status(500).json({

      message: error.message

    });


  }

>>>>>>> 693b0d7 (Added today collection and collector profile features)
};



<<<<<<< HEAD



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
=======
// =========================
// Complete Pickup
// =========================


exports.completePickup = async (req, res) => {

  try {

    const pickup = await PickupRequest.findByPk(req.params.id);


    if (!pickup) {

      return res.status(404).json({

        message: "Pickup request not found"
>>>>>>> 693b0d7 (Added today collection and collector profile features)

      });

    }


<<<<<<< HEAD

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
=======
    await pickup.update({

      Status: "Completed"
>>>>>>> 693b0d7 (Added today collection and collector profile features)

    });



<<<<<<< HEAD
 }catch(error){


    console.log(error);
=======
    res.status(200).json({

      message: "Pickup completed successfully",

      pickup

    });



  } catch(error) {


    console.error("Complete Pickup Error:", error);
>>>>>>> 693b0d7 (Added today collection and collector profile features)


    res.status(500).json({

<<<<<<< HEAD
      message:error.message,
=======
      message: error.message
>>>>>>> 693b0d7 (Added today collection and collector profile features)

    });


<<<<<<< HEAD
 }
=======
  }
>>>>>>> 693b0d7 (Added today collection and collector profile features)

};