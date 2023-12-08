import * as UploadApi from "../api/UploadRequest";
import { uploadFailure, uploadStart, uploadSuccess } from "../redux/postSlice";
export const uploadImage = (data) => async (dispatch) => {
  // console.log("inside uploadimage");
  try {
    await UploadApi.uploadImage(data);
  } catch (error) {
    console.log(error);
  }
};

// export const uploadPost = (data) => async (dispatch) => {
//   dispatch(uploadStart());
//   try {
//     const newPost = await UploadApi.uploadPost(data);
//     dispatch(uploadSuccess(newPost.data));
//   } catch (error) {
//     console.log(error);
//     dispatch(uploadFailure());
//   }
// };
