import * as actionTypes from "../actions/actionTypes";

const initState = {
  loginInfo:''
};

export default function authReducers(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_AUTH: {
      return {
        ...state,
        loginInfo: action.payload,
      };
    }
    // case LOGOUT:{
    //   return{
    //     ...state,
    //     loginUser: '',
    //     loginPassword: '',
    //     isLoggedIn: false
    //   }
    // }
    default: {
      return {
        ...state,
      };
    }
  }
}
