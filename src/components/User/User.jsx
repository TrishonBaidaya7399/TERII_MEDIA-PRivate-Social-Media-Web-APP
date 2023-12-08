import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../redux/apiCalls";
import { Link } from "react-router-dom";
import { getUser } from "../../api/UserRequest";

const UserFollow = ({ person, userOneId }) => {
  const [singleUser, setSingleUser] = useState({});

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [following, setFollowing] = useState(
    person.followers.includes(currentUser.user._id)
  );

  // console.log(
  //   currentUser.user.following.findIndex(
  //     (user) => user._id === "64427f31daa59d76a43f2940"
  //   )
  // );
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getUser(userOneId);
      setSingleUser(data);
    };
    fetchPersons();
  }, []);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleFollow = () => {
    following
      ? unfollowUser(person._id, currentUser, dispatch)
      : followUser(person._id, currentUser, dispatch);
    setFollowing((prev) => !prev);
  };
  return (
    <div
      className="person"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "1rem 0.2rem",
      }}>
      {/* <Link
        to={`/user/${person._id}`}
        style={{ textDecoration: "none", color: "inherit" }}> */}
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/profile/${person._id}`}>
        <div style={{ display: "flex" }}>
          <img
            src={
              person.profilePicture
                ? person.profilePicture
                : serverPublic + "defaultProfile.png"
            }
            alt=""
            className="followerImage"
            style={{ marginLeft: "0.5rem " }}
          />
          <div className="name" style={{ marginLeft: "0.5rem " }}>
            <span>
              {person.firstname} {person.lastname}
            </span>
            {/* <span>{person.lastname}</span> */}
          </div>
        </div>
      </Link>
      {/* </Link> */}
      <button
        style={{ justifyContent: "flex-end" }}
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}>
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserFollow;
