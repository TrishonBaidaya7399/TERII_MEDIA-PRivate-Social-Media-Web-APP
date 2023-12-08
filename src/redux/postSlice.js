import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  posts: [],
  loading: false,
  error: false,
  uploading: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchingStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchingSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = false;
    },
    fetchingFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    uploadStart: (state) => {
      state.uploading = true;
      state.error = false;
    },
    uploadSuccess: (state, action) => {
      state.uploading = false;
      state.posts.push(action.payload);
      state.error = false;
    },
    uploadFailure: (state) => {
      state.uploading = false;
      state.error = true;
    },

    deletePost: (state, action) => {
      state.posts.splice(
        state.posts.findIndex((post) => post._id === action.payload),
        1
      );
    },

    like: (state, action) => {
      if (!state.posts.likes.includes(action.payload)) {
        state.posts.likes.push(action.payload);
      } else {
        state.posts.likes.splice(
          state.posts.likes.findIndex((userId) => userId === action.payload),
          1
        );
      }
    },
  },
});

export const {
  fetchingStart,
  fetchingSuccess,
  fetchingFailure,
  uploadStart,
  uploadSuccess,
  uploadFailure,
  deletePost,
  like,
} = postSlice.actions;

export default postSlice.reducer;
