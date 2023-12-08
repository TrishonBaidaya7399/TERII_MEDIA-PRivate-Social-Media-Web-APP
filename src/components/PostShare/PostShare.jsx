import React, { useState, useRef } from "react";
import ProfileImage from "../../img/profileImg.jpg";
import "./PostShare.css";
import storage from "../../firebase";
// import { UilScenery } from "@iconscout/react-unicons";
// import { UilPlayCircle } from "@iconscout/react-unicons";
// import { UilLocationPoint } from "@iconscout/react-unicons";
// import { UilSchedule } from "@iconscout/react-unicons";
// import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
// import ThreeDRotation from "@mui/icons-material/ThreeDRotation";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../api/UploadRequest";
import { uploadPost } from "../../redux/apiCalls";

const PostShare = () => {
  const loading = useSelector((state) => state.post.uploading);
  // console.log(loading);
  // const loading = false;
  //useState
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(undefined);

  const [isUpload, setIsUPload] = useState(false);
  //instance of useRef
  const imageRef = useRef();
  const dispatch = useDispatch();
  const desc = useRef();
  const { currentUser } = useSelector((state) => state.user); //it may be state.authReducer.authData
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setIsUPload(true);
      let img = event.target.files[0];
      setImage(img);
      upload({ file: img, label: "image" });
    }
  };
  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

  const upload = (item) => {
    const fileName = new Date().getTime() + item.label + item.file.name;
    const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        alert("*Something went wrong! plz try again or refresh the page");
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          setImageUrl(url);
          // console.log(url);
          // setUploaded((prev) => prev + 1);
          // setIsUPload(false);
        });
        setIsUPload(false);
      }
    );
  };

  // const handleUpload = (e) => {
  //   setIsUPload(true);
  //   e.preventDefault();
  //   upload({ file: image, label: "image" });
  //   // vidfile && upload({ file: vidfile, label: "video" });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: currentUser.user._id,
      desc: desc.current.value,
    };
    if (image && !isUpload) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = imageUrl;
      // console.log(newPost);

      // try {
      //   dispatch(uploadImage(data));
      // } catch (error) {
      //   console.log(error);
      // }
    }
    uploadPost(newPost, dispatch);
    reset();
    // window.location.reload();
  };
  // console.log(currentUser.user.profilePicture);
  return (
    <div className="PostShare">
      <img
        src={
          currentUser.user.profilePicture
            ? currentUser.user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt=""
      />
      <div>
        <input
          ref={desc}
          required
          type="text"
          placeholder="What's Happening?"
        />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}>
            <AddPhotoAlternateOutlinedIcon />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <PlayCircleOutlineIcon />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <LocationOnOutlinedIcon />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <CalendarMonthOutlinedIcon />
            Schedule
          </div>
          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={isUpload}>
            {isUpload || loading ? "Uploading..." : "Share"}
          </button>
          {/* {isUpload && (
            <span style={{ color: "orange" }}>
              Plz wait while uploading the image...
            </span>
          )} */}
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <CloseOutlinedIcon onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
