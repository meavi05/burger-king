import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
const sideDrawer = (props) => {

    let attachedClassses = [classes.SideDrawer,classes.Close];
    if (props.open) {
        attachedClassses = [classes.SideDrawer,classes.Open];
    }
    return(
        <Aux>
<Backdrop show={props.open} clicked ={props.closed}></Backdrop>
<div className={attachedClassses.join(' ')} onClick = {props.closed}>
<div className = {classes.Logo}>
    <Logo/>
    </div>
    <nav><NavigationItems isAuthencated = {props.isAuthencated}></NavigationItems></nav>
</div>
</Aux>);

}
export default sideDrawer;