import { useNavigate } from "react-router-dom";
import "./signup.css";
import axios from "axios";

export const Signup = () => {
  let navigate = useNavigate();

  function handleLoginSubmit(e) {
    e.preventDefault();
    let admin_name = e.target[0].value;
    let admin_email = e.target[1].value;
    let admin_password = e.target[2].value;
    let role = e.target[3].value;
    let school_id = Number(e.target[4].value);
    console.log(admin_email, admin_password);
    let obj = {
      admin_name,
      admin_email,
      admin_password,
      role,
      school_id,
    };
    axios
      .post("http://localhost:9000/admins", obj)
      .then(() => {
        alert("Register Success");
        navigate("/login");
      })
      .catch(() => {
        console.log("Error");
      });
  }

  return (
    <div className="maincontainerofsignup">
      <form onSubmit={handleLoginSubmit}>
        <input type="text" placeholder="Enter Name" required />
        <input type="email" placeholder="Enter Email" required />
        <input type="password" placeholder="Enter Password" required />
        <select required>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="viewer">Viewer</option>
        </select>
        <input type="text" placeholder="Enter School Id" required />
        <input type="submit" value="Signup" />
      </form>
    </div>
  );
};
