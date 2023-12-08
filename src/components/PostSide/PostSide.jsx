import React from "react";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const PostSide = () => {
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();
  const profileId = params.id;
  return (
    <div className="PostSide">
      {profileId ? (
        profileId !== currentUser.user._id ? (
          ""
        ) : (
          <PostShare />
        )
      ) : (
        <PostShare />
      )}
      <Posts />
    </div>
  );
};

export default PostSide;
