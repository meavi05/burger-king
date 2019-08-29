
import * as actionTypes from './../actions/actionTypes'
import {updateObject} from './../../shared/utility'
const initialState = {
    token :null,
    userId : null,
    error : null,
    loading : false,
    authRedirectLink : '/'
}
const authStart = (state,action) =>{
    return updateObject(state,{error:null,loading:true})
}
const authSuccess = (state,action) =>{
    return {
        ...state,
        loading:false,
        token:action.idToken,
        userId:action.userId,
        error:null
    }
}
const authFailed = (state,action) =>{
    return {...state,error:action.error,loading:false}
}
const authLogOut = (state,action) =>{
    return {...state, token :null,userId : null}
}
const authRedirectReducer = (state,action) =>{
    return updateObject(state,{authRedirectLink:action.path})
}
const reducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.AUTH_START : return authStart(state,action)
        case actionTypes.AUTH_SUCCESS : return authSuccess(state,action)
        case actionTypes.AUTH_FAILED : return authFailed(state,action)
        case actionTypes.AUTH_LOGOUT : return authLogOut(state,action)
        case actionTypes.AUTH_REDIRECT_LINK : return authRedirectReducer(state,action)
        default :  return state;
    }
}

export default reducer;