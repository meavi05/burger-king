import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary'

const controls = [
    {label:'Salad',type:'salad'},
    {label:'Bacon' ,type:'bacon'},
    {label:'Meat' ,type:'meat'},
    {label:'Cheese',type:'cheese'}
]
const buildControls = (props) => {
    return(
        <Aux>
    <div className = {classes.BuildControls} >
    <div>  <strong>your total price : {props.price.toFixed(2)}</strong></div>
    {controls.map(ctrl => {
        return(
        <BuildControl 
        key ={ctrl.label}
        label = {ctrl.label}
        added = {() => props.ingredientAdded(ctrl.type)}
        removed = {() => props.ingredientRemoved(ctrl.type)}
        disabled = {props.disabled[ctrl.type]}>
        </BuildControl>)
    })}
    <button 
    className = {classes.OrderButton} 
    disabled = {!props.purchasable}
    onClick = {props.ordered}
    > { props.isAuthenticated ? 'ORDER NOW' : 'Please Log In'} </button>
    </div>
    </Aux>);
  }
export default buildControls;