import axios from "axios";


const API_URL = "http://localhost:5000/api/pickups";


// Submit Pickup Request
export const submitPickupRequest = async (data) => {

    try {

        const response = await axios.post(
            `${API_URL}/request`,
            data
        );

        return response.data;

    } catch(error) {

        console.log(
            "Submit Pickup API Error:",
            error.response?.data || error.message
        );

        throw error;

    }

};