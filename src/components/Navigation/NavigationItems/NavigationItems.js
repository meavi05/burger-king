import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css'
const navigationItems = (props) => {
  let navString = <NavigationItem link ="/auth" >Login</NavigationItem>
  let orders = null;
  if(props.isAuthencated) {
    navString = <NavigationItem link ="/logout" >LogOut</NavigationItem>
    orders = <NavigationItem link ="/orders" >Orders</NavigationItem>
    }

      return (<ul className = {classes.NavigationItems}>
          {navString}
          <NavigationItem link ="/" active>Burger Builder</NavigationItem>
          {orders}
      </ul>
      )
}
export default navigationItems;