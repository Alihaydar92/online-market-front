import * as actionTypes from "./actionTypes";
import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_URL;

export const listOfCustomers = (page, pageSize) => (dispatch) => {
  var customerParams=new Object();
  customerParams.page=page-1;
  customerParams.size=pageSize;
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  ); 
  //?page=" + (page - 1) + "&size=" + pageSize
  axiosInstance
    .get("/customers",{params:customerParams})
    .then((response) => {
      dispatch({
        type: actionTypes.LIST_OF_CUSTOMERS,
        payload: response.data,
      });
    });
};
export const getCustomerById = (id) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  axiosInstance.get("/customers/" + id).then((response) => {
    dispatch({
      type: actionTypes.GET_CUSTOMER_BY_ID,
      payload: response.data,
    });
  });
};
export const getCustomerListByExpeditorId = (expeditorId) => (dispatch) => {
  expeditorId=6;//helelik elnen vermisem expeditor id-ni
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  axiosInstance.get("/sellers/"+expeditorId+"/customers").then((response) => {
    dispatch({
      type: actionTypes.GET_CUSTOMER_LIST_BY_EXPEDITOR_ID,
      payload: response.data,
    });
  });
};
export const addCustomer = (data) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  axiosInstance.post("/customers", data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_CUSTOMER,
        payload: response.data,
      });

      dispatch(listOfCustomers());
    }
  });
};

export const updateCustomer = (data) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  axiosInstance.put("/customers/" + data.id, data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.UPDATE_CUSTOMER,
        payload: response.data,
      });

      dispatch(listOfCustomers());
    }
  });
};

export const deleteCustomer = (id) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  axiosInstance.delete("/customers/" + id).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.DELETE_CUSTOMER,
        payload: response.data,
      });

      dispatch(listOfCustomers());
    }
  });
};

export const searchCustomers = (customerData, page, pageSize) => (dispatch) => {
 
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  var customerParams = new Object();
  if (customerData !== "") {
    customerParams.name = customerData;
  }

  customerParams.page = page - 1;

  customerParams.size = pageSize;

  axiosInstance
    .get(
      "/customers",
      // +"?name=Huseyn&page=1&size=15"
      { params: customerParams }
    )
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        dispatch({
          type: actionTypes.SEARCH_CUSTOMER,
          payload: response.data,
        });

        // dispatch(listOfCustomers());
      }
    });
};


