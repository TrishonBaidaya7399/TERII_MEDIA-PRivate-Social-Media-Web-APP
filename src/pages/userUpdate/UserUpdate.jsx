import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./userUpdate.css";
import axios from "axios";
import { PROXY_API } from "../../proxy";
import changePassLogo from "./ChangePassLogo.png";
import { updateUser } from "../../redux/apiCalls";
import { current } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
const UserUpdate = () => {
  const location = useLocation().pathname;
  const userId = location.split("/")[2];
  const [user, setUser] = useState();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const [isLoading, setIsloading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  //   console.log(currentUser.token);
  const dispatch = useDispatch();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`${PROXY_API}/user/${userId}`);
        setUser(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [userId]);
  const [updateAdmin, setUpdateAdmin] = useState(user?.isAdmin);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsloading(true);
    if (password === cpassword) {
      //   updateUser(
      //     userId,
      //     { password: password, isAdmin: updateAdmin },
      //     currentUser?.token,
      //     dispatch
      //   );
      const updateUser = {
        password: password,
        isAdmin: updateAdmin,
      };
      await axios.put(`${PROXY_API}/user/${userId}`, updateUser);
      setIsloading(false);
      alert("*Update user successfull...");
    } else {
      alert("*password and confirm password are not same!");

      setIsloading(false);
    }
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        {/* <NavLink to="/newUser">
          <button className="userAddButton">Create</button>
        </NavLink> */}
      </div>
      <div className="userContainer">
        <div className="userShow">
          {/* <div className="userShowTop">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnBK8yTeSLtkHo1MiDzW5PRi1j64At6hAXOw&usqp=CAU"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">Anna Becker</span>
              <span className="userShowUserTitle">Software Engineering</span>
            </div>
          </div> */}
          <div className="userShowBotton">
            <span className="userShowTitle">Accoutn Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user?.firstname} {user?.lastname}
              </span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.createdAt}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            {/* <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div> */}
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
            {/* <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div> */}
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <img src={changePassLogo} alt="" className="userUpdateImg1" />
              <div className="userUpdateItem">
                <label>Update Password</label>
                <input
                  placeholder="password"
                  className="userUpdateInput"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <input
                  placeholder="confirm password"
                  className="userUpdateInput"
                  type="password"
                  onChange={(e) => setCpassword(e.target.value)}
                />
              </div>

              <div className="userUpdateItem">
                <label>IsAdmin: </label>
                <select
                  name="isAdmin"
                  id="isAdmin"
                  style={{ width: "90px" }}
                  value={updateAdmin}
                  onChange={(e) => setUpdateAdmin(e.target.value)}>
                  <option>options:-</option>
                  <option value="true">Yas</option>
                  <option value="false">No</option>
                </select>
              </div>
              {/* <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div> */}
            </div>

            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                {/* <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnBK8yTeSLtkHo1MiDzW5PRi1j64At6hAXOw&usqp=CAU"
                  alt=""
                  className="userUpdateImg"
                /> */}
                <img
                  src={
                    user?.profilePicture
                      ? user.profilePicture
                      : serverPublic + "defaultProfile.png"
                  }
                  alt=""
                  className="userUpdateImg"
                />
                {/* <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} /> */}
              </div>
              <button className="userUpdateButton" onClick={handleUpdate}>
                {isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
