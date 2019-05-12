import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map((igkey) => {
        return  <li key={igkey}><span style = {{textTransform:'capitalize'}}>{igkey}</span>: {props.ingredients[igkey]}</li>
    })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Your Buger is ready with :</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType = 'Danger' clicked = {props.purchaseCancelled}>CANCEL</Button>
            <Button btnType = 'Success' clicked = {props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
}
export default orderSummary;