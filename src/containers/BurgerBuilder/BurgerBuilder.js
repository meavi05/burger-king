import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls  from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREIENTS_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.7,
    bacon : 1
}
class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0
        },
        totalPrice : 4.0,
        purchasable : false,
        purchasing : false
    }
    purchasableHandler = () => {
        console.log(this);
        this.setState({purchasing : true});
    }
    cancelPurchaseHandler = () => {
        this.setState({purchasing : false});
    }
    purchaseContinuedHandler=  () => {
        alert("purchase Continued")
    }

    updatePurchasableState = (updatedIngredients) => {
        const sum = Object.keys(updatedIngredients).map(igkey => {
            return updatedIngredients[igkey];
        }).reduce((sum,el)=>{
            return sum + el;
        },0);
        console.log(sum);
        this.setState({
            purchasable : sum>0
        })
        }
    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREIENTS_PRICES[type];
        const newPrice =  this.state.totalPrice + priceAddition;
        this.setState({totalPrice : newPrice, ingredients : updatedIngredients});
        this.updatePurchasableState(updatedIngredients);
    }
    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount > 0){
        const updatedCounted = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREIENTS_PRICES[type];
        const newPrice =  this.state.totalPrice - priceAddition;
        this.setState({totalPrice : newPrice, ingredients : updatedIngredients});
        this.updatePurchasableState(updatedIngredients);
        }
    }
    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.cancelPurchaseHandler}>
                    <OrderSummary ingredients = {this.state.ingredients}
                    purchaseCancelled = {this.cancelPurchaseHandler}
                    purchaseContinued = {this.purchaseContinuedHandler}
                    totalPrice = {this.state.totalPrice}>
                    </OrderSummary> 
                </Modal>
                <div>
                <Burger ingredients = {this.state.ingredients}></Burger></div>
                <div>
                    <BuildControls
                    ingredientAdded = {this.addIngredientsHandler}
                    ingredientRemoved = {this.removeIngredientsHandler}
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchasableHandler}
                    ></BuildControls>
                 </div>
            </Aux>
        );
    }
}

export default BurgerBuilder;