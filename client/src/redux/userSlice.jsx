import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state , action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.user = null;
    }
  },
});

export const { setUser , setLogout, reloadUserData } = userSlice.actions;