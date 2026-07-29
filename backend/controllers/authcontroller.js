const jwt = require("jsonwebtoken");
const { User, Admin, Collector } = require("../models");


// ==========================
// USER REGISTER
// ==========================

exports.register = async (req, res) => {

  try {

    const {
      name,
      username,
      password,
      email,
      phone,
      address
    } = req.body;


    const user = await User.create({

      FullName: name,
      Username: username,
      Password: password,
      Email: email,
      Phone: phone,
      Address: address

    });


    res.status(201).json({

      message: "User registered successfully",
      user

    });


  } catch(error) {

    console.error("Register Error:", error);

    res.status(500).json({

      message: error.message

    });

  }

};





// ==========================
// LOGIN
// ==========================

exports.login = async (req, res) => {


  console.log("🔥 LOGIN API HIT");
  console.log("REQUEST BODY:", req.body);



  try {


    const {
      username,
      collectorCode,
      adminUsername,
      password,
      securityCode
    } = req.body;



    let account = null;
    let payload = {};




    // ==========================
    // USER LOGIN
    // ==========================

    if (username) {


      console.log("Checking User Login...");


      account = await User.findOne({

        where:{
          Username: username
        }

      });



      console.log("USER DATA:", account);



      if(account){


        if(account.Password !== password){


          return res.status(401).json({

            message:"Invalid password"

          });


        }



        payload = {

          UserID: account.UserID,
          id: account.UserID,
          username: account.Username,
          role:"user"

        };


      }

    }





    // ==========================
    // COLLECTOR LOGIN
    // ==========================

    if(!account && collectorCode){


      console.log("Checking Collector Login...");


      account = await Collector.findOne({

        where:{
          CollectorCode: collectorCode
        }

      });



      if(account){


        if(account.Password !== password){


          return res.status(401).json({

            message:"Invalid password"

          });


        }



        payload = {

          CollectorID: account.CollectorID,
          id: account.CollectorID,
          username: account.CollectorCode,
          role:"collector"

        };


      }


    }





    // ==========================
    // ADMIN LOGIN
    // ==========================

    if(!account && adminUsername){


      console.log("Checking Admin Login...");


      account = await Admin.findOne({

        where:{
          AdminUsername: adminUsername
        }

      });



      if(account){


        if(account.Password !== password){


          return res.status(401).json({

            message:"Invalid password"

          });


        }



        if(account.SecurityCode !== securityCode){


          return res.status(401).json({

            message:"Invalid security code"

          });


        }



        payload = {

          AdminID: account.AdminID,
          id: account.AdminID,
          username: account.AdminUsername,
          role:"admin"

        };


      }


    }





    // ==========================
    // ACCOUNT NOT FOUND
    // ==========================

    if(!account){


      return res.status(404).json({

        message:"Account not found"

      });


    }





    const token = jwt.sign(

      payload,

      process.env.JWT_SECRET,

      {
        expiresIn:"1d"
      }

    );





    return res.status(200).json({

      message:"Login successful",

      token,

      user:payload

    });




  } catch(error) {


    console.error("🔥 LOGIN ERROR:", error);


    return res.status(500).json({

      message:error.message

    });


  }


};