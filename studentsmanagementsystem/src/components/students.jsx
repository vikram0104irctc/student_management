import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Students = () => {
  let navigate = useNavigate();

  let token = JSON.parse(localStorage.getItem("token"));

  function handleStudentSubmit(e) {
    e.preventDefault();
    let student_id = Number(e.target[0].value);
    let student_name = e.target[1].value;
    let student_age = Number(e.target[2].value);
    let grade = Number(e.target[3].value);
    let school_id = Number(e.target[4].value);
    let obj = {
      student_id,
      student_name,
      student_age,
      grade,
      school_id,
    };
    axios
      .post("http://localhost:9000/students", obj, {
        headers: {
          token: token,
        },
      })
      .then(() => {
        alert("Student added successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }

  return (
    <div className="maincontainerofsignup">
      <form onSubmit={handleStudentSubmit}>
        <input type="text" placeholder="Enter Student Id" required />
        <input type="text" placeholder="Enter Student Name" required />
        <input type="text" placeholder="Enter Student Age" required />
        <input type="text" placeholder="Enter Grade" required />
        <input type="text" placeholder="Enter School Id" required />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};
