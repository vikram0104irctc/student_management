import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const School = () => {
  let navigate = useNavigate();

  function handleSchoolSubmit(e) {
    e.preventDefault();
    let school_name = e.target[0].value;
    let school_address = e.target[1].value;
    let obj = {
      school_name,
      school_address,
    };
    axios
      .post("http://localhost:9000/schools", obj)
      .then(() => {
        alert("School added successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }

  return (
    <div className="maincontainerofsignup">
      <form onSubmit={handleSchoolSubmit}>
        <input type="text" placeholder="Enter School Name" required />
        <input type="text" placeholder="Enter School Address" required />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};
