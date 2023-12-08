import React, { useEffect, useState } from "react";
import "./userList.css";
// import { DataGrid } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "./UserList";
import { NavLink } from "react-router-dom";
import { PROXY_API } from "../../proxy";
import axios from "axios";
// import { getUser } from "../../../../server/Controllers/UserController";
// export { userRows } from "../../DummyData";

const UserList = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${PROXY_API}/user/`);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const handleDelete = (id) => {
    setData(
      data.filter((e) => {
        return e.id !== id;
      })
    );
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 230 },
    {
      field: "users",
      headerName: "Users",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {/* <img src={params.row.avatar} alt="" className="userListImg" /> */}
            {params.row.firstname} {params.row.lastname}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    { field: "isAdmin", headerName: "isAdmin", width: 100 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={"/userUpdate/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </NavLink>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      {users && (
        <DataGrid
          rows={users}
          disableRowSelectionOnClick
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(r) => r._id}
        />
      )}
    </div>
  );
};

export default UserList;
