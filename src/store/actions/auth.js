import * as actionTypes from './actionTypes'
import axios from './../../axios-orders'

export const authSuccess = (token, userId) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        idToken : token,
        userId : userId
    };
};
export const authFailed = (error) => {
    return {
        type : actionTypes.AUTH_FAILED,
        error :error
    };
};
export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    };
};
export const authLogOut = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type : actionTypes.AUTH_LOGOUT
    }
}
export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(authLogOut())
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate < new Date()){
                dispatch(authLogOut())
            }
            else{
                dispatch(authSuccess(token,localStorage.getItem('userId')))
                const newExpireTime = (expirationDate.getTime()- new Date().getTime())/1000
                dispatch(authLogoutAfterExpiration(newExpireTime))
            }

        }
    }
}

export const authLogoutAfterExpiration = (expirationTime) =>{
   return dispatch =>{
       setTimeout(()=>{
           dispatch(authLogOut())
       },expirationTime*1000)
   }
}

export const authRedirectLinkAction = (path) =>{
    return {
        type : actionTypes.AUTH_REDIRECT_LINK,
        path : path
    }
}

export const auth = (email,password,isSignUp) => {
     return dispatch  =>{
         //dispatch(authStart());
            const authData = {
                email : email,
                password : password,
                returnSecureToken:true
         };
         let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB4QbpktRC6xPLRlGl4P0E_d7rgLoF29Sc'
         if(!isSignUp){
             url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB4QbpktRC6xPLRlGl4P0E_d7rgLoF29Sc';
         }
         axios.post(url, authData)
            .then(response => {
        
             console.log(response);
             const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000)
             localStorage.setItem('token',response.data.idToken)
             localStorage.setItem('expirationDate',expirationDate)
             localStorage.setItem('userId',response.data.localId)

             dispatch(authSuccess(response.data.idToken, response.data.localId))
             dispatch(authLogoutAfterExpiration(response.data.expiresIn))
         })
         .catch(err =>{
             console.log(err);
             dispatch(authFailed(err.response.data.error.message));
         })
    }
};
