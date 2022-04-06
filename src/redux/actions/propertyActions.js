import * as actionTypes from "./actionTypes";
import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_URL;
export const listOfProperties = () => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  axiosInstance.get("/properties",{
  }).then((response) => {
    dispatch({
      type: actionTypes.LIST_OF_PROPERTIES,
      payload: response.data,
    });
  });
};

export const addProperty = (data) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  axiosInstance.post("/properties", data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_PROPERTY,
        payload: response.data,
      });
      dispatch(listOfProperties());
    }
  });
};

export const getPropertyById = (id) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  axiosInstance.get("/properties/" + id).then((response) => {
    dispatch({
      type: actionTypes.GET_PROPERTY_BY_ID,
      payload: response.data,
    });
  });
};

export const getPropertyByCategoryId = (categoryId) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  axiosInstance.get("/properties/category/" + categoryId).then((response) => {
    dispatch({
      type: actionTypes.GET_PROPERTY_BY_CATEGORY_ID,
      payload: response.data,
    });
  });
};

export const updateProperty = (data) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  axiosInstance.put("/properties/" + data.id, data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.UPDATE_PROPERTY,
        payload: response.data,
      });
      dispatch(listOfProperties());
    }
  });
};

export const deleteProperty = (id) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  axiosInstance.delete("/properties/" + id).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.DELETE_PROPERTY,
        payload: response.data,
      });
      dispatch(listOfProperties());
    }
  });
};
