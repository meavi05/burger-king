import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import {Redirect} from 'react-router-dom'
import Spinner from '../../components/UI/Spinner/Spinner'
class Auth extends Component {
    state={
        userForm : {
            username : {
                elementType : 'input',
                elementConfig : {
                    type :'text',
                    placeholder :'email'
                },
                validation : {
                    required:true,
                    isEmail:true
                },
                value : 'meavinash05@gmail.com',
                valid:false,
                touched:false
            },
            password : {
                elementType : 'input',
                elementConfig : {
                    type :'text',
                    placeholder :'password'
                },
                validation : {
                    required:true,
                    maxLength:15,
                    minLength:8
                },
                value : '',
                valid:false,
                touched:false
            }
        },
        isSignUp : true
        
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    componentDidMount() {
        if(!this.props.burgerBuilding && this.props.authRedirectLink != '/'){
            this.props.onSetAuthRedirectLink()
        }
    }
    onChangeHandler = (event,inputIdentifier) => {
        //console.log(event.target.value);
        const updatedForm = {...this.state.userForm};
        const updatedFormElement = {...updatedForm[inputIdentifier]};
        updatedFormElement.value=event.target.value;
        updatedForm[inputIdentifier] = updatedFormElement;
        if(updatedFormElement.validation)
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched = true;
       // console.log(updatedFormElement)
        let formIsValid = true;
       /*  for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        } */
        this.setState({userForm: updatedForm});
     }

     onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.doAuth(this.state.userForm.username.value,this.state.userForm.password.value,this.state.isSignUp);
    } 

    switchModeHandler = () => {
        console.log(this)
        this.setState(prevState =>{
             return {isSignUp: !prevState.isSignUp}
        })
    }
    render() {
        const formElementArray =[];
        for(let key in this.state.userForm){
            const element = {id : key, config : this.state.userForm[key] }
            formElementArray.push(element);
        }
        let form = formElementArray.map(element =>(
             <Input 
                key = {element.id} 
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig} 
                value={element.config.value}
                inValid = {!element.config.valid}
                touched = {element.config.touched}
                changed={(event)=>this.onChangeHandler(event,element.id)}
                shouldValidate={element.config.validation}>
                </Input>
        ))
        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = this.props.error;
        }
        let authRedirect = null;
        if(this.props.isAuth){
            authRedirect = <Redirect to ={this.props.authRedirectLink}></Redirect>
        }
        return (
            <div className = {classes.Auth}>
                {authRedirect}
                {errorMessage}
            <form onSubmit={this.onSubmitHandler}>
                 {form}  
                 <Button btnType='Success'>Submit</Button>
            </form>
            <Button btnType='Danger' clicked = {this.switchModeHandler}>Switch To Sign {(this.state.isSignUp ? 'In' : 'Up')}</Button>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
       loading: state.auth.loading,
       error: state.auth.error,
       isAuth : state.auth.token,
       authRedirectLink : state.auth.authRedirectLink,
       burgerBuilding: state.burgerBuilder.building
    };
}
const mapDispatchToProps = (dispatch) =>{
    return {
        doAuth : (email,password,method)=>dispatch(actions.auth(email,password,method)),
        onSetAuthRedirectLink : () =>dispatch(actions.authRedirectLinkAction('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);