const { PickupRequest } = require("../models");


exports.getUserDashboardStats = async (req,res)=>{

  try {

    const totalRequests = await PickupRequest.count();


    const completedPickup = await PickupRequest.count({
      where:{
        status:"Completed"
      }
    });


    const pendingRequest = await PickupRequest.count({
      where:{
        status:"Pending"
      }
    });



    res.json({

      totalRequests,
      completedPickup,
      pendingRequest,
      ecoPoints: totalRequests * 20

    });


  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};