import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false
    }
    componentDidMount() {
        this.props.onInitBurger();
    }
    purchasableHandler = () => {
        this.setState({ purchasing: true });
    }
    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinuedHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout'
        })

    }

    updatePurchasableState = (updatedIngredients) => {
        const sum = Object.keys(updatedIngredients).map(igkey => {
            return updatedIngredients[igkey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
            return sum > 0
    }
    render() {
        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? "Ingredients broken" : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}></Burger>
                    <div>
                        <BuildControls
                            ingredientAdded={this.props.addIngredient}
                            ingredientRemoved={this.props.removeIngredient}
                            disabled={disabledInfo}
                            price={this.props.totalPrice}
                            purchasable={this.updatePurchasableState(this.props.ings)}
                            ordered={this.purchasableHandler}
                        ></BuildControls>
                    </div>
                </Aux>);
            orderSummary = <OrderSummary ingredients={this.props.ings}
                purchaseCancelled={this.cancelPurchaseHandler}
                purchaseContinued={this.purchaseContinuedHandler}
                totalPrice={this.props.totalPrice}>
            </OrderSummary>
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                <div>
                    {burger}
                </div>
            </Aux>
        );
    }
}
const mapStateToProps = state =>{
    return {
        ings :state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error
    };
}
const mapDispatchToProps = (dispatch) =>{
    return {
        addIngredient : (ingName)=>dispatch(actions.addIngredient(ingName)),
        removeIngredient : (ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitBurger : ()=>dispatch(actions.initIngredients()),
        onInitPurchase : ()=>dispatch(actions.purchaseBurgerInit())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));