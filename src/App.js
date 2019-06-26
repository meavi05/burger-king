import React, { Component } from 'react';
import Layout from '../src/hoc/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';

import  { BrowserRouter } from 'react-router-dom';
import { Route,Switch } from 'react-router-dom';
import Checkout from '../src/containers/Checkout/Checkout'
import Orders from '../src/containers/Checkout/Orders/Orders'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div >
       <Layout>
         <Switch>
         <Route path ="/checkout" component ={Checkout}></Route>
         <Route path ="/orders" component ={Orders}></Route>
         <Route path ="/" exact component ={BurgerBuilder}></Route>
         </Switch>
       </Layout>

      </div>  
      </BrowserRouter>
    );
  }
}

export default App;
