import React, { useEffect, useState } from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./UserOne.css";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../api/UserRequest";
import { useSelector } from "react-redux";
import "../../components/Post/Post.css";
import Post from "../Post/Post";
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

const UserOne = () => {
  const { userOneId } = useParams();

  let { posts, loading } = useSelector((state) => state.post);

  if (userOneId) posts = posts.filter((post) => post.userId === userOneId);

  const [singleUser, setSingleUser] = useState({});

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getUser(userOneId);
      setSingleUser(data);
      console.log(data);
    };
    fetchPersons();
  }, []);
  console.log("singleUser", singleUser);
  return (
    <>
      <div className="Profile">
        <ProfileLeft />
        <div className="ProfileCard">
          <div className="ProfileImages">
            <img
              src={
                singleUser?.coverPicture
                  ? serverPublic + singleUser?.coverPicture
                  : serverPublic + "cover.jpg"
              }
              alt=""
            />
            {/* update */}
            <img
              src={
                singleUser?.profilePicture
                  ? serverPublic + singleUser?.profilePicture
                  : serverPublic + "defaultProfile.png"
              }
              alt=""
            />
          </div>
          <div className="ProfileName">
            <span>
              {/* Update */}
              {singleUser.firstname} {singleUser.lastname}
            </span>
          </div>
          <div className="followStatus">
            <hr />
            <div>
              <div className="follow">
                <span>{singleUser?.following?.length}</span>
                <span>Following</span>
              </div>
              <div className="vl"></div>
              <div className="follow">
                <span>{singleUser?.followers?.length}</span>
                <span>Follower</span>
              </div>

              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>
                    {
                      posts?.filter((post) => post.userId === singleUser._id)
                        .length
                    }
                  </span>
                  <span>Posts</span>
                </div>
              </>
            </div>
            <hr />
          </div>

          <div className="Posts">
            {loading
              ? "Fetching Posts..."
              : posts.map((post, id) => {
                  return <Post data={post} id={id} />;
                })}
          </div>
        </div>
        <RightSide />
      </div>
    </>
  );
};

export default UserOne;
