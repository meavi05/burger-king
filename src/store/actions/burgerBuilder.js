import * as actionTypes from './actionTypes'
import axios from './../../axios-orders'

export const addIngredient = (name) => {
    return {
        ingredientName : name,
        type : actionTypes.ADD_INGREDIENTS
    };
};

export const removeIngredient = (name) => {
    return {
        ingredientName : name,
        type : actionTypes.REMOVE_INGREDIENTS
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data))
        })
        .catch(error => {
            dispatch(failedSetIngredients(error))
        })
    }
};
export const failedSetIngredients = (error) => {
    return {
        error : error,
        type : actionTypes.FAILED_SET_INGREDIENTS
    };
};

export const setIngredients = (ingredients) => {
    return {
        ingredients : ingredients,
        type : actionTypes.SET_INGREDIENTS
    };
};