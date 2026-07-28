const express=require("express");

const router=express.Router();


const upload=require("../middleware/upload");

const aiController=require("../controllers/aiController");



router.post(

"/classify",

upload.single("image"),

aiController.classifyWaste

);



module.exports=router;