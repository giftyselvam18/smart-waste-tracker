import { useState } from "react";
import { FaUpload } from "react-icons/fa";


function UploadImage({setImage}) {


const [preview,setPreview]=useState(null);



const handleImage=(e)=>{


const file=e.target.files[0];


if(file){

setImage(file);

setPreview(
URL.createObjectURL(file)
);

}


};



return (

<div className="upload-container">


<label className="upload-box">


<FaUpload/>

<span>
Upload Waste Image
</span>


<input

type="file"

accept="image/*"

onChange={handleImage}

/>


</label>



{
preview &&

<img

src={preview}

className="image-preview"

alt="preview"

/>

}



</div>

);


}


export default UploadImage;