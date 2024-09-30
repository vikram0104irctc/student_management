import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./home.css";
import { updateData } from "../redux/actions";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  let data = useSelector((state) => state.data);
  let role = useSelector((state) => state.role);
  let token = JSON.parse(localStorage.getItem("token"));
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9000/students", {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        dispatch(updateData(res.data));
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  function handleEdit(ele) {
    let student_id = Number(prompt("Enter Student ID:", ele.student_id));
    let student_name = prompt("Enter Student Name:", ele.student_name);
    let student_age = Number(prompt("Enter Student Age:", ele.student_age));
    let grade = Number(prompt("Enter Grade:", ele.grade));
    let school_id = Number(prompt("Enter School ID:", ele.school_id));
    let obj = {
      student_id,
      student_name,
      student_age,
      grade,
      school_id,
    };
    if (student_id && student_name && student_age && grade && school_id) {
      axios
        .put(`http://localhost:9000/students/${ele._id}`, obj, {
          headers: {
            token: token,
          },
        })
        .then(() => {
          alert("Student Upadted successfully");
          axios
            .get("http://localhost:9000/students", {
              headers: {
                token: token,
              },
            })
            .then((res) => {
              dispatch(updateData(res.data));
            })
            .catch((err) => {
              console.log("Error", err);
            });
        })
        .catch((err) => {
          console.log("Error", err.message);
        });
    } else {
      alert("Please fill all required fields");
    }
  }

  function handleDelete(ele) {
    axios
      .delete(`http://localhost:9000/students/${ele._id}`, {
        headers: {
          token: token,
        },
      })
      .then(() => {
        alert("Student Deleted successfully");
        axios
          .get("http://localhost:9000/students", {
            headers: {
              token: token,
            },
          })
          .then((res) => {
            dispatch(updateData(res.data));
          })
          .catch((err) => {
            console.log("Error", err);
          });
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }

  return (
    <div className="maincontainerofhome">
      {data.map((ele, index) => {
        return (
          <div key={index}>
            <h4>Id : {ele.student_id}</h4>
            <p>Name : {ele.student_name}</p>
            <p>Age : {ele.student_age}</p>
            <p>Grade : {ele.grade}</p>
            <p>School_Id : {ele.school_id}</p>
            <div>
              {role == "admin" || role == "teacher" ? (
                <>
                  <button onClick={() => handleEdit(ele)}>Edit</button>
                </>
              ) : (
                ""
              )}
              {role == "admin" ? (
                <>
                  <button onClick={() => handleDelete(ele)}>Delete</button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
