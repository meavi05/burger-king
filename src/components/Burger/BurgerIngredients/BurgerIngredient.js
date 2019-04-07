import React from 'react';
import classes from './BurgerIngredient.module.css'
const burgerIngredient = (props) => {
    let ingredient = null;
    let burgerBread = null;
    switch(props.burgerType) {
        case ('bread-bottom'):{
        ingredient = <div className = {classes.BreadBottom}>Bread Bottom </div>;
        burgerBread = classes.BreadBottom;
        break;
        }
        case ('meat'):{
            ingredient = <div className = {classes.Meat}>Meat</div>;
                        burgerBread = classes.Meat;
                        break;
            }
        case ('bread-top'):{
        ingredient = <div className = {classes.BreadTop}>Bread Top
                        <div className = {classes.Seeds1}>Seed1</div>
                    </div>;
                    burgerBread = classes.BreadTop;
                    break;
        }
        default : {
        ingredient = null;
        burgerBread = null;
        }
    }
    return(<div>    
      <div className = {burgerBread}><p align = "center">Your burger type is {ingredient}</p>
        </div></div>);
}
export default burgerIngredient;