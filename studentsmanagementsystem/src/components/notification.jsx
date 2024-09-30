import { useEffect, useState } from "react";
import "./studentdashboard.css";
import { useNavigate } from "react-router-dom";
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import axios from "axios";

export const NotificationDashboard = () => {
  const socket = io("http://localhost:9000");

  const [newchat, setNewChat] = useState([]);
  const [input, setInput] = useState("");
  let navigate = useNavigate();

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
      socket.emit("newproblem", input);
      let student_id = 45;
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
      <div style={{ marginTop: "100px" }}></div>
      <h4
        style={{ textAlign: "center", marginBottom: "25px", marginTop: "25px" }}
      >
        Post Your Solution
      </h4>
      <div>
        <div className="inputtakingcontainer">
          <input
            value={input}
            type="text"
            placeholder="Enter Solution"
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
