import { useDisclosure } from "@mantine/hooks";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../redux/apiCalls";
import { uploadImage } from "../../api/UploadRequest";
import storage from "../../firebase";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [changePassword, setChangePassword] = useState(undefined);

  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [isUpload, setIsUPload] = useState(false);
  const dispatch = useDispatch();
  const param = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setIsUPload(true);
      let img = event.target.files[0];
      // console.log(img);
      if (event.target.name === "profileImage") {
        setProfileImage(img);
        upload({ file: img, label: "profileImage" });
      } else {
        setCoverImage(img);
        upload({ file: img, label: "coverImage" });
      }
    }
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
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          item.label === "profileImage" && setProfileImageUrl(url);
          item.label === "coverImage" && setCoverImageUrl(url);

          // console.log(url);
          // setUploaded((prev) => prev + 1);
          // setIsUPload(false);
        });
        setIsUPload(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;

    if (profileImage && !isUpload) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);

      UserData.profilePicture = profileImageUrl;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage && !isUpload) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);

      UserData.coverPicture = coverImageUrl;
      // try {
      //   dispatch(uploadImage(data));
      // } catch (err) {
      //   console.log(err);
      // }
    }
    if (changePassword) {
      UserData.password = changePassword;
    }
    updateUser(param.id, UserData, currentUser.token, dispatch);
    // console.log(UserData);

    setModalOpened(false);
  };

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        // title="Authentication"
        size="43%"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}>
        <form action="" className="infoForm">
          <h3>Your Info</h3>
          {!currentUser.user.isAdmin && (
            <>
              <div>
                <input
                  type="text"
                  name="course"
                  placeholder="Course"
                  className="infoInput"
                  onChange={handleChange}
                  value={formData.course}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="semester"
                  placeholder="Current Semester"
                  className="infoInput"
                  onChange={handleChange}
                  value={formData.semester}
                />
                <input
                  type="number"
                  name="roll"
                  placeholder="Roll No"
                  className="infoInput"
                  onChange={handleChange}
                  value={formData.roll}
                />
              </div>
            </>
          )}
          <div>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="infoInput"
              onChange={handleChange}
              value={formData.firstName}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="infoInput"
              onChange={handleChange}
              // onChange={onImageChange}
              value={formData.lastName}
            />
          </div>
          <div>
            <input
              type="text"
              name="worksAt"
              placeholder="Works At"
              className="infoInput"
              onChange={handleChange}
              value={formData.worksAt}
            />
          </div>
          <div>
            <input
              type="text"
              name="livesin"
              placeholder="Lives IN"
              className="infoInput"
              onChange={handleChange}
              value={formData.livesin}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              className="infoInput"
              onChange={handleChange}
              value={formData.country}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Relationship Status"
              className="infoInput"
              name="relationship"
              onChange={handleChange}
              value={formData.relationship}
            />
          </div>
          <div>
            <input
              type="password"
              name="cpassword"
              placeholder="password"
              className="infoInput"
              onChange={(e) => setChangePassword(e.target.value)}
              value={changePassword}
            />
            {/* <input
              type="password"
              name="cpassword"
              placeholder="confirm password"
              className="infoInput"
              onChange={handleChange}
              value={formData.country}
            /> */}
          </div>
          <div style={{ fontSize: "12px", color: "var(--orange)" }}>
            Profile Image
            <input
              type="file"
              name="profileImage"
              onChange={onImageChange}
              disabled={isUpload}
            />
            Cover Image
            <input
              type="file"
              name="coverIamge"
              onChange={onImageChange}
              disabled={isUpload}
            />
          </div>
          <button
            className="button infoButton"
            disabled={isUpload}
            onClick={handleSubmit}>
            {isUpload ? "Uploading..." : "Update"}
          </button>
          {isUpload && <span>*Plz wait while uploading image!</span>}
        </form>
      </Modal>

      {/* <Group position="center">
        <Button onClick={open}>Open modal</Button>
      </Group> */}
    </>
  );
}
export default ProfileModal;
