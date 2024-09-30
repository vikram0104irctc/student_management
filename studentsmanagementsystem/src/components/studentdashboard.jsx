import { useEffect, useState } from "react";
import "./studentdashboard.css";
import { useNavigate } from "react-router-dom";
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import axios from "axios";

export const StudentDashboard = () => {
  const socket = io("http://localhost:9000");

  const [newchat, setNewChat] = useState([]);
  const [input, setInput] = useState("");
  let navigate = useNavigate();

  function handleStudentlogout() {
    localStorage.removeItem("studentdetail");
    navigate("/login");
  }

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/doubts")
      .then((res) => {
        setNewChat(res.data);
      })
      .catch((err) => {
        console.log("Error in data fetching");
      });
  }, []);

  function handleChat() {
    if (input.length <= 4) {
      alert("Problem should be atleast 5 character");
      return;
    } else {
      let nid = JSON.parse(localStorage.getItem("studentdetail"));
      socket.emit("newproblem", input);
      let student_id = nid.student_id;
      let obj = {
        problem: input,
        student_id,
      };
      axios
        .post("http://localhost:9000/api/doubts", obj)
        .then(() => {
          axios
            .get("http://localhost:9000/api/doubts")
            .then((res) => {
              setNewChat(res.data);
            })
            .catch((err) => {
              console.log("Error in data fetching");
            });
        })
        .catch((err) => {
          console.log("Error happening");
        });
      setInput("");
    }
  }

  return (
    <>
      <div className="maincontainerofstudentssss">
        <p onClick={handleStudentlogout}>Logout Student</p>
      </div>
      <h4
        style={{ textAlign: "center", marginBottom: "25px", marginTop: "25px" }}
      >
        Post Your Doubt
      </h4>
      <div>
        <div className="inputtakingcontainer">
          <input
            value={input}
            type="text"
            placeholder="Enter Query"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleChat}>Submit</button>
        </div>
        <div className="containerofchat">
          {newchat.map((ele) => {
            return (
              <div key={ele._id}>
                <p>Student Id : {ele.student_id}</p>
                <p>Query : {ele.problem}</p>
                <p>Date : {ele.createdAt.split("T")[0]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
