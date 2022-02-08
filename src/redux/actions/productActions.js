import * as actionTypes from "./actionTypes";
import axiosInstance from "../../helpers/axios";



export const listOfProductsByPage = (page, pageSize) => (dispatch) => {
  console.log("page and pagesize ", page + "//" + pageSize);
  axiosInstance
    .get("/products?page=" + (page - 1) + "&size=" + pageSize)
    .then((response) => {
      dispatch({
        type: actionTypes.LIST_OF_PRODUCTS_BY_PAGE,
        payload: response.data,
      });
    });
};

export const getProductById = (id) => (dispatch) => {
  axiosInstance.get("/products/" + id).then((response) => {
    console.log("response ", response.data);
    dispatch({
      type: actionTypes.GET_PRODUCT_BY_ID,
      payload: response.data,
    });
  });
};

export const addProduct = (data, page, pageSize) => (dispatch) => {
  axiosInstance.post("/products", data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_PRODUCT,
        payload: response.data,
      });
      dispatch(listOfProductsByPage(page, pageSize));
    }
  });
};

export const updateProduct = (data, paginationData) => (dispatch) => {
  console.log("update product data ", data);
  console.log("update paginationData data ", paginationData);
  axiosInstance.put("/products/" + data.id, data).then((response) => {
    console.log(response.status);
    console.log(response.data);
    if (response.status === 200) {
      dispatch({
        type: actionTypes.UPDATE_PRODUCT,
        payload: response.data,
      });
      dispatch(
        listOfProductsByPage(paginationData.page, paginationData.pageSize)
      );
    }
  });
};
export const deleteProduct = (id, paginationData) => (dispatch) => {
  axiosInstance.delete("/products/" + id).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.DELETE_PRODUCT,
        payload: response.data,
      });
      dispatch(
        listOfProductsByPage(paginationData.page, paginationData.pageSize)
      );
    }
  });
};

export const addProductExcel = (data, paginationData) => (dispatch) => {
  
  axiosInstance.post("/products/excel", data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_PRODUCT_EXCEL,
        payload: response.data,
      });
      dispatch(
        listOfProductsByPage(paginationData.page, paginationData.pageSize)
      );
    }
  });
};

export const addProductImages = (id, data, paginationData) => (dispatch) => {
  axiosInstance
    .post("/product/" + id + "/images/list", data)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: actionTypes.ADD_PRODUCT_IMAGES,
          payload: response.data,
        });
        dispatch(
          listOfProductsByPage(paginationData.page, paginationData.pageSize)
        );
      }
    });
};

export const getProductImagesByProductId = (id) => (dispatch) => {
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

export const searchProduct = (searchData, paginationData) => (dispatch) => {
  var productParams = new Object();
  if (searchData.name !== "") {
    productParams.name = searchData.name;
  }
  if (searchData.note !== "") {
    productParams.note = searchData.note;
  }
  if (searchData.barcode !== "") {
    productParams.barcode = searchData.barcode;
  }
  axiosInstance
    .get("/products/v1", { params: productParams })
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
