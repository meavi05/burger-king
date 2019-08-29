import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from '../Layout/Layout.module.css';
import ToolBar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
class Layout extends Component{
    state = {
        showSideDrawer : false
    }
    sideDrawerCloseHandler = ()=>{
        this.setState({
            showSideDrawer : false
        })
    }
    drawerToggleClickedHandler = () => {
        this.setState((prevState)=>{
            return{showSideDrawer : !prevState.showSideDrawer};
        })
    }
render(){
    console.log('Inside Layout' + classes.design);
return (
<Aux> 
    <div className = {classes.Content}>
    <ToolBar isAuthencated = {this.props.isAuth} drawerToggleClicked = {this.drawerToggleClickedHandler}></ToolBar>
    <SideDrawer  isAuthencated = {this.props.isAuth} open = {this.state.showSideDrawer} closed = {this.sideDrawerCloseHandler}></SideDrawer>
    </div>
    <main>{this.props.children}</main>
</Aux>)
}
};
const mapStateToProps = state =>{
    return {
        isAuth :state.auth.token
    };
}
const mapDispatchToProps = (dispatch) =>{
    return {
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Layout);