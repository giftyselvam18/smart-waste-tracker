exports.classifyWaste = async(req,res)=>{


try{


if(!req.file){

return res.status(400).json({

message:"Image required"

});

}


// Demo AI classification

// Later TensorFlow/Python AI connect pannalam


let category="Plastic";


const random =
Math.floor(Math.random()*5);



if(random===0)
category="Plastic";


else if(random===1)
category="Metal";


else if(random===2)
category="Glass";


else if(random===3)
category="Paper";


else
category="Organic";




res.status(200).json({

message:"Waste classified successfully",

image:req.file.filename,

category:category,

confidence:
Math.floor(Math.random()*20)+80


});



}
catch(error){


res.status(500).json({

message:error.message

});


}


};