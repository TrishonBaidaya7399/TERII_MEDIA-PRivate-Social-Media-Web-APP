import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import UserOne from "./components/UserOne/UserOne";
import UserUpdate from "./pages/userUpdate/UserUpdate";
import UserList from "./pages/userList/UserList";
function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? <Navigate to="home" /> : <Navigate to="auth" />
          }
        />
        <Route
          path="/home"
          element={currentUser ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/userUpdate/:id"
          element={currentUser ? <UserUpdate /> : <Navigate to="../auth" />}
        />
        <Route
          path="/userList"
          element={currentUser ? <UserList /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={currentUser ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={currentUser ? <Profile /> : <Auth />}
        />
        <Route path="/user/:userOneId" element={<UserOne />} />
      </Routes>
    </div>
  );
}

export default App;
