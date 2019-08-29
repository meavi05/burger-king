import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => {
    return(
        <header className ={classes.Toolbar}>
            <DrawerToggle clicked = {props.drawerToggleClicked}></DrawerToggle>
            <div className = {classes.Logo}>
            <Logo></Logo>
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthencated = {props.isAuthencated}></NavigationItems>
            </nav>
        </header>
    );
}
export default toolbar;