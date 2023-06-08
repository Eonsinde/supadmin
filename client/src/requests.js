import axios from 'axios';


export const getProducts = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // make request to get user
    const request = await axios.get(`${import.meta.env.VITE_API_URL}api/client/products`, config);
    return request.data;
}