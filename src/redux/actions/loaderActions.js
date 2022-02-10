import * as actionTypes from "./actionTypes";

export const showLoader =() =>(dispatch)=>{
    dispatch({
      type:actionTypes.SHOW_LOADER,
      payload:true
    })
    }
    
    export const hideLoader = () => (dispatch)=>{
      dispatch({
        type:actionTypes.HIDE_LOADER,
        payload:false
      })
    }