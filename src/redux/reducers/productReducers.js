import initialState from "./initialState";
import * as actionTypes from "../actions/actionTypes";

export default function productReducers(state = initialState, action) {
  switch (action.type) {
    // case actionTypes.LIST_OF_PRODUCTS_BY_PAGE: {
    //   return {
    //     ...state,
    //     productListDataByPage: action.payload,
    //   };
    // }

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
    case actionTypes.GET_PRODUCT_LIST_BY_ID_IS_NOT_CHANGED: {
      console.log('not changed')
      let temp = initialState.productListDataById;
      console.log(initialState.productListDataById)
      action.payload.pages.forEach((element) => {
        temp.push(element);
      });
   
      // temp=[...initialState.productListDataByCategoryId, ...action.payload.pages]
      console.log('not changed',temp)
      return {
        // ...state,
        productListDataById: temp,
        totalPages: action.payload.totalPages,
        totalItems: action.payload.totalItems,
        currentPage:action.payload.currentPage
      };
    }
    case actionTypes.GET_PRODUCT_LIST_BY_ID_IS_CHANGED: {
      console.log(' changed')
      action.payload.pages.forEach((element) => {
        initialState.productListDataById.push(element);
      });
      return {
        productListDataById: initialState.productListDataById,
        totalPages: action.payload.totalPages,
        totalItems: action.payload.totalItems,
        currentPage:action.payload.currentPage
      };
    }

    // case actionTypes.GET_PRODUCT_LIST_BY_PROPERTY_ID_IS_NOT_CHANGED: {
    //   let temp = initialState.productListDataById;
    //   action.payload.pages.forEach((element) => {
    //     temp.push(element);
    //   });
    //   // temp=[...initialState.productListDataByCategoryId, ...action.payload.pages]
    //   return {
    //     // ...state,
    //     productListDataById: temp,
    //     totalPages: action.payload.totalPages,
    //     totalItems: action.payload.totalItems,
    //     currentPage:action.payload.currentPage
    //   };
    // }
    // case actionTypes.GET_PRODUCT_LIST_BY_PROPERTY_ID_IS_CHANGED: {
    //   return {
    //     productListDataById: action.payload.pages,
    //     totalPages: action.payload.totalPages,
    //     totalItems: action.payload.totalItems,
    //     currentPage:action.payload.currentPage
    //   };
    // }

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
