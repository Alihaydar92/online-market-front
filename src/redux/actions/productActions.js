import * as actionTypes from "./actionTypes";
import { showLoader, hideLoader } from "../actions/loaderActions";
import { message, notification } from "antd";
import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_URL;

// export const listOfProductsByPage = (page, pageSize) => (dispatch) => {
//   const axiosInstance = axios.create({
//     baseURL: baseURL,
//     auth: {
//       username: window.localStorage.getItem("username"),
//       password: window.localStorage.getItem("password"),
//     },
//   });
//   console.log("page and pagesize ", page + "//" + pageSize);
//   axiosInstance
//     .get("/products/paged?page=" + (page - 1) + "&size=" + pageSize)
//     .then((response) => {
//       dispatch({
//         type: actionTypes.LIST_OF_PRODUCTS_BY_PAGE,
//         payload: response.data,
//       });
//       console.log("response product", response);
//     });
// };

export const listOfProducts = () => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.get("/products").then((response) => {
    console.log(response.data);
    dispatch({
      type: actionTypes.LIST_OF_PRODUCTS,
      payload: response.data,
    });
  });
};

export const getProductById = (id) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.get("/products/" + id).then((response) => {
    console.log("response ", response.data);
    dispatch({
      type: actionTypes.GET_PRODUCT_BY_ID,
      payload: response.data,
    });
  });
};

export const getProductListByCategoryId =
  (categoryId, page, isChangeCategory) => (dispatch) => {
    console.log("getProductListByCategoryId metod call");
    const axiosInstance = axios.create({
      baseURL: baseURL,
      auth: {
        username: window.localStorage.getItem("username"),
        password: window.localStorage.getItem("password"),
      },
    });
    dispatch(showLoader());
    axiosInstance
      .get("/categories/" + page + "/" + categoryId + "/products")
      .then((response) => {
        console.log("response ", response.data);
        if (isChangeCategory) {
          dispatch({
            type: actionTypes.GET_PRODUCT_LIST_BY_ID_IS_CHANGED,
            payload: response.data,
          });
        } else {
          dispatch({
            type: actionTypes.GET_PRODUCT_LIST_BY_ID_IS_NOT_CHANGED,
            payload: response.data,
          });
        }

        dispatch(hideLoader());
      });
  };

export const getProductListByPropertyId =
  (propertyId, page, isChangeProperty) => (dispatch) => {
    console.log("getProductListByPropertyId metod call");
    const axiosInstance = axios.create({
      baseURL: baseURL,
      auth: {
        username: window.localStorage.getItem("username"),
        password: window.localStorage.getItem("password"),
      },
    });
    dispatch(showLoader());
    axiosInstance
      .get("/properties/" + page + "/" + propertyId + "/products")
      .then((response) => {
        console.log("response ", response.data);
        if (isChangeProperty) {
          dispatch({
            type: actionTypes.GET_PRODUCT_LIST_BY_ID_IS_CHANGED,
            payload: response.data,
          });
        } else {
          dispatch({
            type: actionTypes.GET_PRODUCT_LIST_BY_ID_IS_NOT_CHANGED,
            payload: response.data,
          });
        }

        dispatch(hideLoader());
      });
  };

export const getProductListAll = (page, isChangeProperty) => (dispatch) => {
  console.log("getProductListAll metod call");
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  dispatch(showLoader());
  axiosInstance.get("/" + page + "/products/all").then((response) => {
    console.log("response ", response.data);
    if (isChangeProperty) {
      dispatch({
        type: actionTypes.GET_PRODUCT_LIST_BY_ID_IS_CHANGED,
        payload: response.data,
      });
    } else {
      dispatch({
        type: actionTypes.GET_PRODUCT_LIST_BY_ID_IS_NOT_CHANGED,
        payload: response.data,
      });
    }

    dispatch(hideLoader());
  });
};

export const getProductListNew = (page, isChangeProperty) => (dispatch) => {
  console.log("getProductListNew metod call");
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  dispatch(showLoader());
  axiosInstance.get("/" + page + "/products/new").then((response) => {
    console.log("response ", response.data);
    if (isChangeProperty) {
      dispatch({
        type: actionTypes.GET_PRODUCT_LIST_BY_ID_IS_CHANGED,
        payload: response.data,
      });
    } else {
      dispatch({
        type: actionTypes.GET_PRODUCT_LIST_BY_ID_IS_NOT_CHANGED,
        payload: response.data,
      });
    }

    dispatch(hideLoader());
  });
};

export const addProduct = (data, page, pageSize) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.post("/products", data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_PRODUCT,
        payload: response.data,
      });
      dispatch(searchProduct("", page, pageSize));
    }
  });
};

export const updateProduct = (data, paginationData) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.put("/products/" + data.id, data).then((response) => {
    console.log(response.status);
    console.log(response.data);
    if (response.status === 200) {
      dispatch({
        type: actionTypes.UPDATE_PRODUCT,
        payload: response.data,
      });
      dispatch(searchProduct("", paginationData.page, paginationData.pageSize));
    }
  });
};
export const deleteProduct = (id, paginationData) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.delete("/products/" + id).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.DELETE_PRODUCT,
        payload: response.data,
      });
      dispatch(searchProduct("", paginationData.page, paginationData.pageSize));
    }
  });
};

export const addProductExcel = (data, paginationData) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  dispatch(showLoader());
  axiosInstance.post("/products/excel", data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_PRODUCT_EXCEL,
        payload: response.data,
      });
      dispatch(hideLoader());
      console.log(response);
      notification["success"]({ message: response.data, description: "" });
      dispatch(searchProduct("", paginationData.page, paginationData.pageSize));
    }
  });
};

export const addProductImages = (id, data, paginationData) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance
    .post("/product/" + id + "/images/list", data)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: actionTypes.ADD_PRODUCT_IMAGES,
          payload: response.data,
        });
        dispatch(
          searchProduct("", paginationData.page, paginationData.pageSize)
        );
      }
    });
};

export const getProductImagesByProductId = (id) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.get("/product/" + id + "/images").then((response) => {
    console.log("get product imgs by product id reposne data: ", response.data);
    if (response.status === 200) {
      dispatch({
        type: actionTypes.GET_PRODUCT_IMAGES_BY_PRODUCT_ID,
        payload: response.data,
      });
    }
  });
};

export const searchProduct =
  (searchData, page, pageSize, isFromSearchPagination) => (dispatch) => {
    console.log(page);
    console.log(isFromSearchPagination);
    console.log("searchData", searchData);
    const axiosInstance = axios.create({
      baseURL: baseURL,
      auth: {
        username: window.localStorage.getItem("username"),
        password: window.localStorage.getItem("password"),
      },
    });
    var productParams = new Object();
    console.log(searchData);
    if (searchData !== "") {
      productParams.keyword = searchData;

      if (isFromSearchPagination) {
        productParams.page = page - 1;
      } else {
        productParams.page = 0;
      }
    } else {
      productParams.page = page - 1;
    }
    productParams.size = pageSize;
    axiosInstance
      .get("/products/v2", { params: productParams })
      .then((response) => {
        console.log(
          "get product imgs by product id reposne data: ",
          response.data
        );
        if (response.status === 200) {
          dispatch({
            type: actionTypes.SEARCH_PRODUCT,
            payload: response.data,
          });
        }
      });
  };

export const getProductListByProAndCatId =
  (proId, catId, cartPage, isChange) => (dispatch) => {
    console.log("getProductListByPropertyId metod call");
    var cartParams = new Object();
    cartParams.page = cartPage;
    if (proId !== null && proId !== undefined) {
      cartParams.propertyId = proId;
    }
    if (catId !== null && catId !== undefined) {
      cartParams.categoryId = catId;
    }
    const axiosInstance = axios.create({
      baseURL: baseURL,
      auth: {
        username: window.localStorage.getItem("username"),
        password: window.localStorage.getItem("password"),
      },
    });
    console.log(cartParams);
    dispatch(showLoader());
    axiosInstance.get("/sells?", { params: cartParams }).then((response) => {
      console.log("response ", response.data);
      if (isChange) {
        dispatch({
          type: actionTypes.GET_PRODUCT_LIST_BY_ID_IS_CHANGED,
          payload: response.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_PRODUCT_LIST_BY_ID_IS_NOT_CHANGED,
          payload: response.data,
        });
      }

      dispatch(hideLoader());
    });
  };

  export const getProductListByProduct =
  (productInput, cartPage, isChange) => (dispatch) => {
    console.log("getProductListByProduct metod call");
    var cartParams = new Object();
    cartParams.page = cartPage;
   if(productInput!==""){
    cartParams.param=productInput;
   }
    const axiosInstance = axios.create({
      baseURL: baseURL,
      auth: {
        username: window.localStorage.getItem("username"),
        password: window.localStorage.getItem("password"),
      },
    });
    console.log(cartParams);
    dispatch(showLoader());
    axiosInstance.get("/sells/anyparam?", { params: cartParams }).then((response) => {
      console.log("response ", response.data);
      if (isChange) {
        dispatch({
          type: actionTypes.GET_PRODUCT_LIST_BY_ID_IS_CHANGED,
          payload: response.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_PRODUCT_LIST_BY_ID_IS_NOT_CHANGED,
          payload: response.data,
        });
      }

      dispatch(hideLoader());
    });
  };

  export const getAllProducts = (cartPage,isChange) => (dispatch) => {
    var cartParams = new Object();
    cartParams.page = cartPage;
    const axiosInstance = axios.create({
      baseURL: baseURL,
      auth: {
        username: window.localStorage.getItem("username"),
        password: window.localStorage.getItem("password"),
      },
    });
    axiosInstance.get("/sells/products?",{params:cartParams}).then((response) => {
      console.log("response ", response.data);
      if (isChange) {
        dispatch({
          type: actionTypes.GET_PRODUCT_LIST_BY_ID_IS_CHANGED,
          payload: response.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_PRODUCT_LIST_BY_ID_IS_NOT_CHANGED,
          payload: response.data,
        });
      }

      dispatch(hideLoader());
    });
  };

  export const getAllNewProducts = (cartPage,isChange) => (dispatch) => {
    var cartParams = new Object();
    cartParams.page = cartPage;
    const axiosInstance = axios.create({
      baseURL: baseURL,
      auth: {
        username: window.localStorage.getItem("username"),
        password: window.localStorage.getItem("password"),
      },
    });
    axiosInstance.get("/sells/new/products?",{params:cartParams}).then((response) => {
      console.log("response ", response.data);
      if (isChange) {
        dispatch({
          type: actionTypes.GET_PRODUCT_LIST_BY_ID_IS_CHANGED,
          payload: response.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_PRODUCT_LIST_BY_ID_IS_NOT_CHANGED,
          payload: response.data,
        });
      }

      dispatch(hideLoader());
    });
  };