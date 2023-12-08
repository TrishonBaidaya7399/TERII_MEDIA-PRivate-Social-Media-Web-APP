import axios from "axios";
const API = axios.create({ baseURL: "https://teriimediaserver2.onrender.com" });
export const logIn = (formData) => API.post("/auth/logIn", formData);
export const signUp = (formData) => API.post("/auth/register", formData);
