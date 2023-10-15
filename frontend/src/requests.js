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

export const getTransactions = async (page, pageSize, sort, searchQuery) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    };

    // make request to get user
    const request = await axios.get(
        `${import.meta.env.VITE_API_URL}api/client/transactions?page=${page}&pageSize=${pageSize}&sort=${JSON.stringify(sort.sortField !== "" ? {
            sortOrder: sort.sortOrder,
            sortField: sort.sortField
        } : null)}&search=${searchQuery}`, 
        config
    );

    // const request = await axios.get(
    //     `${import.meta.env.VITE_API_URL}api/client/transactions?page=${page}&pageSize=${pageSize}&sort=${JSON.stringify({})}&search=${searchQuery}`, 
    //     config
    // );

    return request.data;
}