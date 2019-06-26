import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.module.css';
import Button from '../../UI/Button/Button';
const checkoutSummary = function(props){
    return(
        <div className ={classes.CheckoutSummary}>
            <h1>Your final Burger ::</h1>
            <div style={{width:'300px',margin:'auto'}}>
            <Burger ingredients ={props.ingredients}></Burger>
            </div>
            <div>
                <Button btnType = "Danger" clicked = {props.cancelled}>CANCEL</Button>
                <Button btnType = "Success" clicked = {props.continued}>CONTINUE</Button>
            </div>
        </div>
    );
}
export default checkoutSummary;