import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;
const username = window.localStorage.getItem("username");
const password = window.localStorage.getItem("password");
// console.log(window.localStorage.getItem("username"))
// console.log(window.localStorage.getItem("password"))
const axiosInstance = axios.create({
  
  baseURL: baseURL,
  auth: {
    username: window.localStorage.getItem("username"),
    password: window.localStorage.getItem("password"),
  },
  
}
);

export default axiosInstance;
