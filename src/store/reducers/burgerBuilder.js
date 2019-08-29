import * as actionTypes from '../actions/actionTypes'
import {updateObject} from './../../shared/utility'

const intialState = {
    ingredients : null,
    totalPrice: 4.0,
    error: false,
    building : false
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
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
        return updateObject(state, {
            totalPrice: state.totalPrice + INGREIENTS_PRICES[action.ingredientName],
            building: true,
            ingredients: updatedIngredients
            })
        }
       const removeIngredients=(state,action)=>{
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
            const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
            return updateObject(state, {
                totalPrice: state.totalPrice + INGREIENTS_PRICES[action.ingredientName],
                building: true,
                ingredients: updatedIngredients
                })
}
const setIngredients=(state,action)=>{
    const  updatedIngredients = {
        salad:action.ingredients.salad,
        meat:action.ingredients.meat,
        bacon:action.ingredients.bacon,
        cheese:action.ingredients.cheese
    }
            return updateObject(state,{
                totalPrice: 4.0,
                error : false,
                building : false,
                ingredients : updatedIngredients
            }) 
}
const failedIngredients=(state)=>{
        return updateObject(state,{error : true})
}

export default reducer;
