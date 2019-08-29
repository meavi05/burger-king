import React, { Component } from 'react';
import Layout from '../src/hoc/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Auth from '../src/containers/Auth/Auth'
import Logout from '../src/containers/Auth/Logout/Logout'

import  { BrowserRouter } from 'react-router-dom';
import { Route,Switch } from 'react-router-dom';
import Checkout from '../src/containers/Checkout/Checkout'
import Orders from '../src/containers/Checkout/Orders/Orders'
import { connect } from 'react-redux';
import * as actions from './store/actions/index'
import { Redirect } from 'react-router-dom'

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  render() { 
   
    let routes = (
      <Switch>
      <Route path ="/auth" exact component ={Auth}></Route> 
      <Route path ="/" exact component ={BurgerBuilder}></Route>
      <Redirect to ="/"></Redirect>
      </Switch>
    );
    if(this.props.isAuthenticated){
       routes = (
      <Switch>
      <Route path ="/checkout" component ={Checkout}></Route>
      <Route path ="/orders" component ={Orders}></Route>
      <Route path ="/logout" exact component ={Logout}></Route> 
      <Route path ="/auth" exact component ={Auth}></Route> 
      <Route path ="/" exact component ={BurgerBuilder}></Route>
      <Redirect to ="/"></Redirect>
      </Switch>
      );
    }
    return (
      <BrowserRouter>
      <div >
       <Layout>
       {routes}
       </Layout>

      </div>  
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state =>{
  return {
    isAuthenticated : state.auth.token
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    onTryAutoSignup : () => dispatch (actions.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
