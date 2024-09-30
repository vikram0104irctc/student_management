import { UPDATE_DATA, UPDATE_LOGIN, UPDATE_ROLE } from "./actions";

const initstate = {
  isLogin: localStorage.getItem("token") ? true : false,
  role: localStorage.getItem("role")
    ? JSON.parse(localStorage.getItem("role"))
    : "",
  data: [],
};

export function Reducer(state = initstate, action) {
  switch (action.type) {
    case UPDATE_LOGIN:
      return { ...state, isLogin: action.payload };
    case UPDATE_ROLE:
      return { ...state, role: action.payload };
    case UPDATE_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
