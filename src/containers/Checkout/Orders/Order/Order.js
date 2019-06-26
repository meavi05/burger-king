import React from 'react';
import classes from './Order.module.css';
import Burger from '../../../../components/Burger/Burger'
const order = (props) => {
  let customerData =  Object.keys(props.customer).map((key)=>{
    if(key=='name' || key=='deliveryMethod')
    return ( 
    <div key = {key}>
   <span style =  {{textTransform:'capitalize'}}> <strong>{key}: </strong></span> 
  <strong>{props.customer[key]}</strong>
  </div>)
  })

   let orderMenu =  Object.keys(props.ingredients).map((key)=>{
        return ( <div key = {key}>
       <span style = {{textTransform:'capitalize'}}> <strong>{key}: </strong></span> 
      <strong>{props.ingredients[key]}</strong>
        </div> )})
   //console.log({check})
    return (<div className = {classes.Order}>
    <Burger ingredients={props.ingredients} fromOrder='true'></Burger>
     {customerData}
    {orderMenu}</div>)
}
export default order;