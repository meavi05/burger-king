import React, { Component }from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'
import classes from './ContactData.module.css'
import { connect } from 'react-redux'
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '../../../store/actions/index'
import Spinner from './../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        formIsValid: false,
        orderForm : {
            name :{
                elementType : 'input',
                elementConfig : {
                    type :'text',
                    placeholder :'Your Name'
                },
                value : '',
                validation : {
                    required:true,
                    maxLength:15,
                    minLength:8
                },
                valid:false,
                touched:false
            },
            street : {
                elementType : 'input',
                elementConfig : {
                    type :'text',
                    placeholder :'Street'
                },
                value : '',
                valid:false,
                touched:false
            },
            zipCode : {
                elementType : 'input',
                elementConfig : {
                    type :'text',
                    placeholder :'Country Code'
                },
                value : '',
                validation : {
                    required:true
                },
                valid:false,
                touched:false
            },
            country :  {
                elementType : 'input',
                elementConfig : {
                    type :'text',
                    placeholder :'Country'
                },
                value : '',
                validation : {
                    required:true
                },
                valid:false,
                touched:false
            },
            email :  {
                elementType : 'input',
                elementConfig : {
                    type :'text',
                    placeholder :'email'
                },
                value : '',
                valid:false,
                touched:false
            },
            deliveryMethod :  {
                elementType : 'select',
                elementConfig : {
                  options : [
                      {value:'fastest',displayValue:'Fastest'},
                      {value:'cheapest',displayValue:'Cheapest'}
                  ]
                },
                value : 'Fastest',
                valid:false,
                touched:false
            }

        }
    }
    /* state = {
        name : '',
        email : '',
        address : {
            street : '',
            postalCode : ''
        },
        loading : false
    } */

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

    onChangeHandler = (event,inputIdentifier) => {
        console.log(event.target.value);
        const updatedForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedForm[inputIdentifier]};
        updatedFormElement.value=event.target.value;
        updatedForm[inputIdentifier] = updatedFormElement;
        if(updatedFormElement.validation)
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched = true;
        console.log(updatedFormElement)
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedForm, formIsValid: formIsValid});
     }

    orderHandler = (event) => {
        event.preventDefault();
          alert(this.props.totalPrice);
          const formData = {};
          for(let formElementIdentifier in this.state.orderForm){
              formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
          }
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.totalPrice.toFixed(2),
            orderData : formData
          }

        console.log(`orderHandler -> Before API Call`);
        this.props.onOrderBurger(order,this.props.token);
    } 

    componentDidMount() {
        console.log(`componentDidMount -> Contact Data`);
    }

    componentWillUnmount() {
        console.log(`componentDidMount -> Contact Data`);
    }

    render(){
        console.log(`render -> Contact Data`);
        const formElementArray = [];
        for(let key in this.state.orderForm){
           let obj =  {id : key,config : this.state.orderForm[key]}
            formElementArray.push(obj)
        }

        let form = (
        <form onSubmit ={this.orderHandler}>
                      {formElementArray.map(element=>( 
                      <Input 
                         key = {element.id} 
                         elementType={element.config.elementType}
                         elementConfig={element.config.elementConfig} 
                         value={element.config.value}
                         inValid = {!element.config.valid}
                         touched = {element.config.touched}
                         changed={(event)=>this.onChangeHandler(event,element.id)}
                         shouldValidate={element.config.validation}
                         >   
                         </Input>)
                    )}
                    <br></br>
                    <Button btnType="Success">Order
                    </Button>
                </form>)

        if(this.props.loading){
            form = <Spinner/>;
        }
        return(
            <div className ={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }

}
const mapStateToProps = state =>{
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token
    };
} 

const mapDispatchToProps = (dispatch) =>{
    return {
        onOrderBurger : (orderData,token)=>dispatch(orderActions.purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));