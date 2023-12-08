import React, { useEffect, useState } from "react";
import Cover from "../../img/cover.jpg";
// import Profile from "../../img/profileImg.jpg";
// import ProfileDefault from "../../img/Profile.png";

import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { PROXY_API } from "../../proxy";

const ProfileCard = ({ location }) => {
  const { currentUser } = useSelector((state) => state.user);

  const params = useParams();
  const profileUserId = params.id;
  // console.log(currentUser);
  const { posts } = useSelector((state) => state.post);
  // Update
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(currentUser.user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${PROXY_API}/user/${profileUserId}`);

        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    profileUserId ? fetchUser() : setUser(currentUser.user);
  }, [profileUserId]);

  // console.log(serverPublic + user.coverPicture);
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        {/* update */}
        <img
          src={
            user.coverPicture ? user.coverPicture : serverPublic + "cover.jpg"
          }
          alt=""
        />
        {/* update */}
        <img
          src={
            user.profilePicture
              ? user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt=""
        />
      </div>
      <div className="ProfileName">
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span>
          {user.worksAt
            ? user.worksAt
            : currentUser.user._id === user._id && "Write about yourself🖋"}
        </span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user?.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user?.followers.length}</span>
            <span>Follower</span>
          </div>
          {/* {(location === "profilePage" || location === "home") && ( */}
          <>
            <div className="vl"></div>
            <div className="follow">
              <span>
                {posts?.filter((post) => post.userId === user?._id).length}
              </span>
              <span>Posts</span>
            </div>
          </>
          {/* )} */}
        </div>
        <hr />
      </div>
      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${currentUser.user._id}`}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
