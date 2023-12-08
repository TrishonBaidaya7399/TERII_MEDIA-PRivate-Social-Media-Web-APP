import React, { useEffect, useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useDispatch, useSelector } from "react-redux";
import { likePost, postDelete } from "../../redux/apiCalls";
import axios from "axios";
import { PROXY_API } from "../../proxy";
// import { likePost } from "../../api/PostRequest";
import DeleteIcon from "@mui/icons-material/Delete";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "5px solid orange",
  borderRadius: "10px ",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Post = ({ data }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(data.likes.includes(currentUser.user._id));
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  // console.log(currentUser.user._id);
  const [likes, setLikes] = useState(data.likes.length);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, currentUser.user._id, dispatch);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`${PROXY_API}/user/${data?.userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [data]);
  const descArr = data.desc.split("\n");

  const isLongDesc = data.desc.length > 167;

  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = (e) => {
    e.preventDefault();
    postDelete(data._id, currentUser.user, dispatch);
    setOpen(false);
  };

  return (
    <>
      <div className="Post">
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
          <img
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              border: "1px solid var(--orange)",
            }}
            src={
              user.profilePicture
                ? user.profilePicture
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
            }
            alt=""
          />
          <span style={{ marginLeft: "1rem" }}>
            <b>
              {user.firstname} {user.lastname}
            </b>
          </span>
          <div
            className="deleteBtn"
            style={{
              marginLeft: "auto",
              color: "var(--orange)",
            }}>
            {(currentUser?.user._id === user?._id ||
              currentUser?.user.isAdmin) && (
              <DeleteIcon
                onClick={() => setOpen(true)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>
        <div className="detail cuttoff_text">
          <span> {data.desc}</span>
        </div>
        {isLongDesc && <input type="checkbox" className="expand-btn" />}

        <img src={data.image ? data.image : ""} alt="" />

        <div className="postReact">
          <img
            src={liked ? Heart : NotLike}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={handleLike}
          />
          <img src={Comment} alt="" />
          <img src={Share} alt="" />
        </div>
        <span style={{ color: "var(--gray)", fontSize: "12px" }}>
          {likes}

          {data.likes > 1 ? " Likes" : " Like"}
        </span>
      </div>
      {/* // modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className="postDelete">
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              Confirm to delete:
            </Typography>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                margin: "1rem",
                marginTop: "-0.5rem",
                marginBottom: "-1rem",
              }}>
              <button
                className="button rd-button"
                onClick={() => setOpen(false)}>
                Cancle
              </button>
              <button className="button rd-button" onClick={handleDelete}>
                Confirm
              </button>
            </div>
          </Box>
        </div>
      </Modal>
    </>
  );
};
export default Post;
