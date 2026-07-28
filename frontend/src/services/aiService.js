import axios from "axios";


const API_URL =
"http://localhost:5000/api/ai";



export const classifyWaste = async(image)=>{


const formData = new FormData();


formData.append(
"image",
image
);



const response = await axios.post(

`${API_URL}/classify`,

formData,

{

headers:{

"Content-Type":"multipart/form-data"

}

}

);



return response.data;


};