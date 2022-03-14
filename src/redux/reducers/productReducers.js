import initialState from "./initialState";
import * as actionTypes from "../actions/actionTypes";

export default function productReducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LIST_OF_PRODUCTS_BY_PAGE: {
      return {
        ...state,
        productListDataByPage: action.payload,
      };
    }

    case actionTypes.LIST_OF_PRODUCTS: {
      return {
        ...state,
        productListData: action.payload,
      };
    }

    case actionTypes.GET_PRODUCT_BY_ID: {
      return {
        ...state,
        productDataById: action.payload,
      };
    }
    case actionTypes.GET_PRODUCT_LIST_BY_CATEGORY_ID_IS_NOT_CHANGED: {
      let temp = initialState.productListDataByCategoryId;
      action.payload.pages.forEach((element) => {
        temp.push(element);
      });
      // temp=[...initialState.productListDataByCategoryId, ...action.payload.pages]
      return {
        // ...state,
        productListDataByCategoryId: temp,
        totalPages: action.payload.totalPages,
        totalItems: action.payload.totalItems,
        currentPage:action.payload.currentPage
      };
    }
    case actionTypes.GET_PRODUCT_LIST_BY_CATEGORY_ID_IS_CHANGED: {
      return {
        productListDataByCategoryId: action.payload.pages,
        totalPages: action.payload.totalPages,
        totalItems: action.payload.totalItems,
        currentPage:action.payload.currentPage
      };
    }

    case actionTypes.DELETE_PRODUCT: {
      return {
        ...state,
        productDeleteData: action.payload,
      };
    }
    case actionTypes.ADD_PRODUCT: {
      return {
        ...state,
        productAddData: action.payload,
      };
    }

    case actionTypes.UPDATE_PRODUCT: {
      return {
        ...state,
        productUpdateData: action.payload,
      };
    }
    case actionTypes.GET_PRODUCT_IMAGES_BY_PRODUCT_ID: {
      return {
        ...state,
        productImagesDataByProductId: action.payload,
      };
    }
    case actionTypes.SEARCH_PRODUCT: {
      return {
        ...state,
        productListDataByPage: action.payload,
      };
    }
    default:
      return state;
  }
}
