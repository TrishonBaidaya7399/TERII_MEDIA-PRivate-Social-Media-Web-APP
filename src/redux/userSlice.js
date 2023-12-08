import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.currentUser = null;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.error = true;
    },
    registerStart: (state) => {
      state.loading = true;
      state.currentUser = null;
      state.error = false;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
    registerFailure: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.error = true;
    },

    updatingStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    updatingSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    updatingFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    follow: (state, action) => {
      if (!state.currentUser.user.following.includes(action.payload)) {
        state.currentUser.user.following.push(action.payload);
      }
    },
    unfollow: (state, action) => {
      state.currentUser.user.following.splice(
        state.currentUser.user.following.findIndex(
          (userId) => userId._id === action.payload
        ),
        1
      );
    },

    logout: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.error = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  updatingStart,
  updatingSuccess,
  updatingFailure,
  follow,
  unfollow,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
