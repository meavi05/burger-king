import * as actionTypes from './../actions/actionTypes'
const initialState = {
    orders :[],
    loading : false,
    error : false,
    purchased : false
}

const reducer = (state=initialState,action) =>{
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state)
        case actionTypes.PURCHASE_BURGER_INIT: return purchaseBurgerInit(state)
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action)
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state)
        default : return state;
    }
}
const purchaseBurgerStart = (state) =>{
    {
        return{
        ...state,
        loading : true
        }
    }
}
const purchaseBurgerInit=(state)=>{
    {
        return {
            ...state,
            purchased : false
        }
    }
}
const purchaseBurgerSuccess =(state,action)=>{
    {
        const newOrder = {
            ...action.orderData,
            id : action.orderId
           
        }
        return {
            ...state,
            loading : false,
            purchased : true,
            newOrders : state.orders.concat(newOrder)
        };
    }
}
const purchaseBurgerFail =(state)=>{
    {
        return {
            ...state,
            error : true
        };
    }
}
export default reducer;