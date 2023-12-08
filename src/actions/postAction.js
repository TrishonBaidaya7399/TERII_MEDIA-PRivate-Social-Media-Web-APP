import * as PostApi from "../api/PostRequest";
import { uploadFailure, uploadStart, uploadSuccess } from "../redux/postSlice";

export const getTimeLinePosts = async (id, dispatch) => {
  dispatch(uploadStart());
  try {
    const result = await PostApi.getTimeLinePosts(id);

    dispatch(uploadSuccess(data));
  } catch (error) {
    dispatch(uploadFailure());
    console.log(error);
  }
};
