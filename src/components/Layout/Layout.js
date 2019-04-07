import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from '../Layout/Layout.module.css';
const layout = (props) => {

    console.log('Inside Layout' + classes.design);
return (
<Aux>
    <div className = {classes.Contentx}>All designing will go here</div>
    <main >{props.children}</main>
</Aux>)

};
export default layout;