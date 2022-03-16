import initialState from "./initialState";
import * as actionTypes from "../actions/actionTypes";

export default function storeHouseReducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LIST_OF_STOREHOUSE: {
      return {
        ...state,
        storeHouseListData: action.payload,
      };
    }

    case actionTypes.GET_STOREHOUSE_BY_ID: {
      return {
        ...state,
        storeHouseDataById: action.payload,
      };
    }

    case actionTypes.LIST_OF_QUANTITIES: {
      return {
        ...state,
        listOfQuantities: action.payload,
      };
    }

    case actionTypes.GET_STORE_HOUSE_BY_QUANTITY: {
      return {
        ...state,
        storeHouseListData: action.payload,
      };
    }
    case actionTypes.GET_STORE_HOUSE_BY_BARCODE: {
      return {
        ...state,
        storeHouseListData: action.payload,
      };
    }
    case actionTypes.STOREHOUSE_COUNT_COMBO: {
      return {
        ...state,
        storeHouseCountCombo: action.payload,
      };
    }
    case actionTypes.STOREHOUSE_NUMERATE_RESULT: {
      return {
        ...state,
        storeHouseNumerateResult: action.payload,
      };
    }
    
    // case actionTypes.DELETE_PRODUCT: {
    //   return {
    //     ...state,
    //     productDeleteData: action.payload,
    //   };
    // }
    // case actionTypes.ADD_PRODUCT: {
    //   return {
    //     ...state,
    //     productAddData: action.payload,
    //   };
    // }

    // case actionTypes.UPDATE_PRODUCT: {
    //   return {
    //     ...state,
    //     productUpdateData: action.payload,
    //   };
    // }
    // case actionTypes.GET_PRODUCT_IMAGES_BY_PRODUCT_ID: {
    //   return {
    //     ...state,
    //     productImagesDataByProductId: action.payload,
    //   };
    // }
    default:
      return state;
  }
}
