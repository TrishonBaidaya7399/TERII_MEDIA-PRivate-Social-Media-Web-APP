import React, { useState } from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import Setting from "@mui/icons-material/SettingsOutlined";
import ShareModal from "../ShareModal/ShareModal";
import TrendCard from "../TrendCard/TrendCard";
import { Link, useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useSelector } from "react-redux";
const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to="../home">
          <img src={Home} alt="" />
        </Link>
        <div style={{ color: "var(--orange)" }}>
          {currentUser?.user.isAdmin && (
            <AdminPanelSettingsIcon
              onClick={() => navigate("/userList")}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
        <Setting />
        <img src={Noti} alt="" />
        <img src={Comment} alt="" />
      </div>
      <TrendCard />
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
