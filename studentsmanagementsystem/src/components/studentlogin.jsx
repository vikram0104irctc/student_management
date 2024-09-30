import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const StudentLogin = () => {
  let navigate = useNavigate();

  function handleLoginSubmit(e) {
    e.preventDefault();
    let student_id = Number(e.target[0].value);
    let obj = {
      student_id,
    };
    axios
      .post("http://localhost:9000/studentlogin", obj)
      .then((res) => {
        alert("Login success");
        localStorage.setItem("studentdetail", JSON.stringify(res.data));
        navigate("/studentdashboard");
      })
      .catch((err) => {
        alert("Invalid Student Id");
        console.log("Error", err.message);
      });
  }

  return (
    <div className="maincontainerofsignup">
      <form onSubmit={handleLoginSubmit}>
        <input type="text" placeholder="Enter Student Id" required />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};
