import React from 'react';
import BurgerIngredient from '../Burger/BurgerIngredients/BurgerIngredient';
import Aux from '../../hoc/Auxiliary';
const burger = (props) => {
    return(<Aux><BurgerIngredient burgerType = "bread-top"></BurgerIngredient>
    <BurgerIngredient burgerType = "meat"></BurgerIngredient>
    <BurgerIngredient burgerType = "bread-bottom"></BurgerIngredient></Aux>);
}
export default burger;