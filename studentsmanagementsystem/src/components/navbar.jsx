import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import { updateData, updateLogin, updateRole } from "../redux/actions";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  let login = useSelector((state) => state.isLogin);
  let role = useSelector((state) => state.role);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(updateLogin(false));
    dispatch(updateRole(""));
    dispatch(updateData([]));
    alert("User logged out");
  }

  return (
    <div className="mainconatinerofnavbar">
      <div className="containerofnav">
        <h2 onClick={() => (login ? navigate("/") : "")}>
          Students Management
        </h2>
        <div className="elementsofnav">
          {role == "admin" ? (
            <>
              <p onClick={() => navigate("/students")}>Add Students</p>
              <p onClick={() => navigate("/school")}>Add Schools</p>
              <p onClick={() => navigate("/allschool")}>Show Schools</p>
            </>
          ) : (
            ""
          )}
          {login ? (
            <p onClick={() => navigate("/notification")}>Notification</p>
          ) : (
            ""
          )}
          {login ? (
            <p onClick={handleLogout}>Logout</p>
          ) : (
            <>
              <p onClick={() => navigate("/login")}>Login</p>
              <p onClick={() => navigate("/signup")}>Signup</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
