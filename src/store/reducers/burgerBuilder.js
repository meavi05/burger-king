import * as actionTypes from '../actions/actionTypes'

const intialState = {
    ingredients : null,
    totalPrice: 4.0,
    error: false
}


const INGREIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.7,
    bacon: 1
}

const reducer = (state = intialState,action) =>{
    switch (action.type){
            case actionTypes.ADD_INGREDIENTS:return addIngredients(state,action)
            case actionTypes.REMOVE_INGREDIENTS:return removeIngredients(state,action)        
            case actionTypes.SET_INGREDIENTS:return setIngredients(state,action)
            case actionTypes.FAILED_SET_INGREDIENTS:return failedIngredients(state)
            default:return state;
    }
}

const addIngredients=(state,action)=>{
    {   
        return {
            ...state,
        ingredients : {
             ...state.ingredients,
             [action.ingredientName]:state.ingredients[action.ingredientName]+1
            },
            totalPrice : state.totalPrice + INGREIENTS_PRICES[action.ingredientName]
         };
    }
}
const removeIngredients=(state,action)=>{
    {   
        return {
        ...state,
        ingredients : {
             ...state.ingredients,
             [action.ingredientName]:state.ingredients[action.ingredientName]-1
            },
            totalPrice : state.totalPrice - INGREIENTS_PRICES[action.ingredientName]
         };
    }
}
const setIngredients=(state,action)=>{
    {
        return {
            ...state,
            //ingredients: action.ingredients,
            ingredients:{
                salad:action.ingredients.salad,
                meat:action.ingredients.meat,
                bacon:action.ingredients.bacon,
                cheese:action.ingredients.cheese
            },
            error : false,
            totalPrice : 4.0
        }
    }
}
const failedIngredients=(state)=>{
    {
        return {
            ...state,
            error: true
        }
    }
}

export default reducer;
