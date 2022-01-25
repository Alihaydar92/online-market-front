import axios from "axios";

const baseURL=process.env.REACT_APP_BACKEND_URL;
// const baseURL="http://localhost:8080";


const axiosInstance=axios.create({
    baseURL:baseURL
})

export default axiosInstance;