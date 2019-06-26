import React from 'react';
import burgerLogo from '../../assests/images/burger-logo.png';
import classes from './Logo.module.css'

const logo = (props) => {
   // console.log(classes); 
return (
    <div className ={classes.Logo}>
        <img src = {burgerLogo} alt = "MyBurger" ></img>
    </div>
)
}
export default logo;