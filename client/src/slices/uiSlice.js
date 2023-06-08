import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: localStorage.theme ? localStorage.theme : "",
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.theme = state.theme;
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeTheme } = uiSlice.actions

export default uiSlice.reducer