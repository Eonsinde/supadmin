import { createSlice } from "@reduxjs/toolkit"

// get user from local storage
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const initialState = {
    userInfo: userInfo ? userInfo : null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        clearCredentials: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        }
    }
})

export const { setCredentials, clearCredentials } = authSlice.actions; 

export default authSlice.reducer;