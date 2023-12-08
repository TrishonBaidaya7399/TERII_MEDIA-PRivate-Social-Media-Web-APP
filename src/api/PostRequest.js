import axios from "axios";
const API = axios.create({ baseURL: "https://teriimediaserver2.onrender.com" });
export const getTimeLinePosts = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) =>
  API.put(`post/${id}/like`, { userId: userId });
