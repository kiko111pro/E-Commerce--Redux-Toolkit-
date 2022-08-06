import { createSlice } from "@reduxjs/toolkit";

const fetchUserfromLocalStorage = () =>
  JSON.parse(localStorage.getItem("USER"));

const initialState = {
  user: fetchUserfromLocalStorage() || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("USER", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
