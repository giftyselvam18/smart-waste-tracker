const jwt = require("jsonwebtoken");
const { User, Admin, Collector } = require("../models");

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





// LOGIN WITHOUT ROLE

exports.login = async (req, res) => {

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



    // =====================
    // USER LOGIN
    // username + password
    // =====================

    if (username) {

      account = await User.findOne({
        where: {
          Username: username
        }
      });


      if (account) {

        if (account.Password !== password) {

          return res.status(401).json({
            message: "Invalid password"
          });

        }


        payload = {

          id: account.UserID,
          username: account.Username,
          type: "user"

        };

      }

    }



    // =====================
    // COLLECTOR LOGIN
    // collectorCode + password
    // =====================

    if (!account && collectorCode) {


      account = await Collector.findOne({

        where: {
          CollectorCode: collectorCode
        }

      });



      if (account) {


        if (account.Password !== password) {

          return res.status(401).json({
            message: "Invalid password"
          });

        }



        payload = {

          id: account.CollectorID,
          username: account.CollectorCode,
          type: "collector"

        };


      }

    }




    // =====================
    // ADMIN LOGIN
    // adminUsername + password + securityCode
    // =====================

    if (!account && adminUsername) {


      account = await Admin.findOne({

        where: {
          AdminUsername: adminUsername
        }

      });



      if (account) {


        if (account.Password !== password) {

          return res.status(401).json({
            message: "Invalid password"
          });

        }



        if (account.SecurityCode !== securityCode) {

          return res.status(401).json({
            message: "Invalid security code"
          });

        }



        payload = {

          id: account.AdminID,
          username: account.AdminUsername,
          type: "admin"

        };


      }

    }



    if (!account) {

      return res.status(404).json({

        message: "Account not found"

      });

    }



    const token = jwt.sign(

      payload,

      process.env.JWT_SECRET,

      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }

    );



    res.status(200).json({

      message: "Login successful",

      token,

      user: payload

    });



  } catch(error) {


    console.error("Login Error:", error);


    res.status(500).json({

      message:error.message

    });


  }

};