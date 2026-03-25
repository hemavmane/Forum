import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("forumuser");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedUser ? JSON.parse(storedUser).token : null,
  isLoggedIn: !!storedUser,
};

const authSlice = createSlice({
  name: "auth",
   initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user   = action.payload;
      state.token= action.payload.token;

      state.isLoggedIn = true;

      localStorage.setItem("forumuser", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;
      state.token   = null;
      state.isLoggedIn = false;

      localStorage.removeItem("forumuser");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;