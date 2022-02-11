// import axios from "axios";
// import * as actionTypes from "./actionTypes";
// const baseURL = process.env.REACT_APP_BACKEND_URL;

// export const loginAuth = (userInfo) => (dispatch) => {
//   const axiosInstance = axios.create({
//     baseURL: baseURL,
//     auth: {
//       username: userInfo.username,
//       password: userInfo.password,
//     },
//   });

//   axiosInstance
//     .get("/basicauth")
//     .then((response) => {
//       console.log(response.status)
//       dispatch({
//         type: actionTypes.LOGIN_AUTH,
//         payload: response.status,
//       });
//     })
//     .catch((error) => {
//       dispatch({
//         type: actionTypes.LOGIN_AUTH,
//         payload: error.response.status,
//       });
     
//     });
// };
