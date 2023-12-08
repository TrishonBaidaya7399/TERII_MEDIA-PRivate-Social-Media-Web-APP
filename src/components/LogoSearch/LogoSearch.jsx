import React from "react";
import Logo from "../../img/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import "./LogoSearch.css";
const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" style={{ height: "40px", width: "40px" }} />
      <div className="Search">
        <input type="text" placeholder="#Explore" />
        <div className="s-icon">
          <SearchIcon className="searchicon" />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
