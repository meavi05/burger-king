import React from 'react';
import BurgerIngredient from '../Burger/BurgerIngredients/BurgerIngredient';
import classes from './Burger.module.css'
const burger = (props) => {
    let style = classes.Burger;
   let transformIngredients = Object.keys(props.ingredients).map(igkey => {
            return [...Array(props.ingredients[igkey])].map((_,i) => {
               return  <BurgerIngredient key = {igkey + i} burgerType = {igkey}/>; 
            });
    }).reduce((arr, el)=>{
        return arr.concat(el);
    },[]);
    if(transformIngredients.length === 0){
        transformIngredients = <p>Please start adding the ingredients..!</p>;
    }
    if(props.fromOrder){
        style = classes.SmallBurger;
    }
    return(<div className= {style}>
    <BurgerIngredient burgerType = "bread-top"></BurgerIngredient>
    {transformIngredients}
    <BurgerIngredient burgerType = "bread-bottom"></BurgerIngredient>
    </div>);
}
export default burger;