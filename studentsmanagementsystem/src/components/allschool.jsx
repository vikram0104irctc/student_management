import { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";

export const AllSchool = () => {
  let [school, setSchool] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/schools")
      .then((res) => {
        setSchool(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  return (
    <div className="maincontainerofhome">
      {school.map((ele, index) => {
        return (
          <div key={index}>
            <h4>Id : {ele.school_id}</h4>
            <p>Name : {ele.school_name}</p>
            <p>Add : {ele.school_address}</p>
          </div>
        );
      })}
    </div>
  );
};
