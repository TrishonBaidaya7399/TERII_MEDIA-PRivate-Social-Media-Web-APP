import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
  updatingStart,
  updatingSuccess,
  updatingFailure,
  follow,
  unfollow,
} from "./userSlice";
import * as PostApi from "../api/PostRequest";

import { PROXY_API } from "../proxy";
import {
  deletePost,
  fetchingFailure,
  fetchingStart,
  fetchingSuccess,
  like,
  uploadFailure,
  uploadStart,
  uploadSuccess,
} from "./postSlice";

export const login = async (user, dispatch, navigate, setError) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${PROXY_API}/auth/login`, user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    setError(error);
    dispatch(loginFailure());
  }
};

export const register = async (user, dispatch, setError) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(`${PROXY_API}/auth/register`, user);
    dispatch(registerSuccess());
  } catch (error) {
    setError(error);
    dispatch(registerFailure());
  }
};

export const updateUser = async (id, user, token, dispatch) => {
  dispatch(updatingStart());
  try {
    const res = await axios.put(`${PROXY_API}/user/${id}`, user, {
      headers: {
        token: `Bearer ${token}`,
      },
    });

    dispatch(updatingSuccess(res.data));
    window.location.reload();
  } catch (error) {
    dispatch(updatingFailure());
  }
};

export const uploadPost = async (data, dispatch) => {
  dispatch(uploadStart());
  try {
    const newPost = await axios.post(`${PROXY_API}/post/`, data);
    dispatch(uploadSuccess(newPost.data));
    window.location.reload();
  } catch (error) {
    console.log(error);
    dispatch(uploadFailure());
  }
};

export const uploadImage = async (data) => {
  try {
    const newPost = await axios.post(`${PROXY_API}/post/`, data);
  } catch (error) {
    console.log(error);
  }
};

export const getTimeLinePosts = async (id, dispatch) => {
  dispatch(fetchingStart());
  try {
    const result = await axios.get(`${PROXY_API}/post/${id}/timeline`);
    dispatch(fetchingSuccess(result.data));
  } catch (error) {
    dispatch(fetchingFailure());
    console.log(error);
  }
};

export const likePost = async (id, userId, dispatch) => {
  try {
    const res = await axios.put(`${PROXY_API}/post/${id}/like`, {
      userId: userId,
    });
    dispatch(like(userId));
  } catch (error) {
    console.log(error);
  }
};

export const postDelete = async (id, user, dispatch) => {
  // console.log(userId);
  try {
    // console.log(user);
    await axios.delete(`${PROXY_API}/post/${id}`);
    dispatch(deletePost(id));
  } catch (error) {
    console.log(error);
  }
};

export const followUser = async (id, user, dispatch) => {
  try {
    const res = await axios.put(`${PROXY_API}/user/${id}/follow`, user.user, {
      headers: {
        token: `Bearer ${user.token}`,
      },
    });
    dispatch(follow(user.user));
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = async (id, user, dispatch) => {
  try {
    const res = await axios.put(`${PROXY_API}/user/${id}/unfollow`, user.user, {
      headers: {
        token: `Bearer ${user.token}`,
      },
    });
    dispatch(unfollow(user.user._id));
  } catch (error) {
    console.log(error);
  }
};
