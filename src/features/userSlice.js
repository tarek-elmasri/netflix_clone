import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  loggedIn: false,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      return {
        ...state,
        loggedIn: true,
        id: payload.id,
        email: payload.email,
        isLoading: false,
      };
    },
    removeUser: (state) => {
      return { ...state, loggedIn: false, email: "", isLoading: false };
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
