import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as order from '../../store/actions/index' 
class Checkout extends Component{
    state = {
        // totalPrice : 0,
        // ingredients : 
        // {
        //     salad:1,
        //     meat:1,
        //     cheese:1,
        //     bacon:0
        // }

    }
    cancelHandler = () => {
        this.props.history.goBack();
    }
    continueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    componentWillMount = () => {
       // this.props.onInitPurchase();
    }
    componentDidMount = () =>{
       // const query = new URLSearchParams(this.props.location.search);
        // const ingredients ={};
        // let price = 0;
        // for(let param of query.entries()){
        //     if("price"!==param[0])
        //     ingredients[param[0]] = +param[1];
        //     else
        //     {
        //         price = +param[1];
        //     }
        // }
        // this.setState({ingredients :ingredients,totalPrice:price});
         console.log(`componentDidMount -> Checkout`);
    }
render(){
    
    console.log(`render -> Checkout`);
    let summary = <Redirect to ="/"/>
    if(this.props.ingredients){
        const purchaseRedirect = this.props.purchased ? <Redirect to="/"/> : null
        summary = (
            <div>
                {purchaseRedirect}
                 <CheckoutSummary 
            ingredients = {this.props.ingredients}
            cancelled = {this.cancelHandler}
            continued = {this.continueHandler}
            />
            <Route path={this.props.match.path+'/contact-data'}  component =  {ContactData}></Route>
            </div>
        )
    }
    return summary

};
}

const mapStateToProps = state =>{
    return {
        ingredients :state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        purchased : state.order.purchased
    };
}
const mapDispatchToProps = (dispatch) =>{
    return {
        onInitPurchase : ()=>dispatch(order.purchaseBurgerInit())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Checkout);