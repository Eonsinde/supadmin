import axios from "axios";
import { fetchApiUrl } from "utils";


const login = async (userData) => {
    const response = await axios.post(`${fetchApiUrl()}/api/users/login`, userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
}

const register = async (userData) => {
    const response = await axios.post(`${fetchApiUrl()}/api/users/register`, userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
}

const logout = async () => {
    localStorage.removeItem("user");
}

const authService = {
    register,
    login,
    logout
}

export default authService;