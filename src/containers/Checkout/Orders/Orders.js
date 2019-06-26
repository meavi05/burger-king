import React, { Component } from 'react';
import Order from './Order/Order';
import axios from '../../../axios-orders'
class Orders extends Component {
    state = {
        orders : []
    }
    componentDidMount(){
    axios.get("/order.json")
    .then((response) =>{
        //console.log(response)
        const fetchedOrders =[];
        for(let key in response.data){
           // console.log('Hello')
           
            fetchedOrders.push({...response.data[key], id : key});
        }
        this.setState({orders : fetchedOrders})
       // this.setState({ingredients : response.data})
          console.log(fetchedOrders)
    })
    .catch(()=>{
        console.log('error in fetching orders')
    })
        
    }
    render(){

        return (
            this.state.orders.map((order)=>{
               const customerList = [];
                for(let key in order.orderData){
                    const customerData = {};
                    customerData[key]=order.orderData[key];
                    customerList.push(customerData)
                }
                return <Order key = {order.id}
                        customer = {order.orderData} ingredients = {order.ingredients}></Order>
            })
        )
    }
}
export default Orders;