import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest.js";
import { logout } from "../../redux/userSlice";
import { orange } from "@mui/material/colors";
import Faculty from "../../img/faculty.jpg";
const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === currentUser.user._id) {
        setProfileUser(currentUser.user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser.data);
      }
    };
    fetchProfileUser();
  }, [currentUser, params]);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {currentUser.user._id === profileUserId ? (
          <div>
            <EditOutlinedIcon
              width="2rem"
              height="1.2rem"
              fontSize="small"
              className="EditPen"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={currentUser}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      {/* ....................................... */}
      {profileUser.isAdmin ? (
        <span
          style={{
            fontSize: "20px",
            color: "var(--orange)",
            fontWeight: 700,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "1rem",
          }}>
          <img
            className="faculty"
            src={Faculty}
            alt=""
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "-1rem",
              width: "100%",
              height: "80%",
              marginBottom: "-1rem",
              borderRadius: "50%",
            }}
            class="center"
          />
          <br />
          <div
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",

              textAlign: "center",
            }}>
            *** ADMIN ID ***
          </div>
        </span>
      ) : (
        <>
          <div className="info">
            <span>
              <b>Couse: </b>
            </span>
            <span>{profileUser.course}</span>
          </div>
          <div className="info">
            <span>
              <b>Semester: </b>
            </span>
            <span>{profileUser.semester}</span>
          </div>
          <div className="info">
            <span>
              <b>Roll No: </b>
            </span>
            <span>{profileUser.roll}</span>
          </div>
        </>
      )}
      {/* .................................................. */}
      <div className="info">
        <span>
          <b>Status: </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in: </b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at: </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      {currentUser.user._id === profileUserId && (
        <button className="button Logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default InfoCard;
