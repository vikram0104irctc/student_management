import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Private = (props) => {
  let login = useSelector((state) => state.isLogin);
  let navigate = useNavigate();
  let { Component } = props;
  useEffect(() => {
    if (!login) {
      navigate("/login");
    }
  }, [navigate, login]);
  return <Component />;
};
