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

export const getCustomers = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    };

    // make request to get user
    const request = await axios.get(`${import.meta.env.VITE_API_URL}api/client/customers`, config);
    return request.data;
}