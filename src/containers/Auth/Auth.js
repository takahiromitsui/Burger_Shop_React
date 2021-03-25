import React, { Component } from "react";

import classes from './Auth.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
  };

  checkValidity(value,rules) {
    let isValid = true;
    if (rules.required){
      isValid = value.trim() !== ''&&isValid;
    }
    if(rules.minLength){
      isValid = value.trim().length >= rules.minLength&&isValid;
    }
    return isValid;
  }
  inputChangeHandler = (event,controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName] : {
        ...this.state.controls[controlName],
        value:event.target.value,
        valid:this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched:true
      }
    }
    this.setState({controls:updatedControls});
  }
  render() {
    const formElementsArray = [];
      for (let key in this.state.controls){
      //key = name, street and etc
      //config = object
      formElementsArray.push({
        id: key,
        config:this.state.controls[key],
      })
    }
    const form = formElementsArray.map(formElement =>(
      <Input 
        key = {formElement.id}
        elementType = {formElement.config.elementType}
        elementConfig = {formElement.config.elementConfig}
        value = {formElement.config.value}
        changed= {(event)=>this.inputChangeHandler(event,formElement.id)}
        />
      
    ))
    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button btnType= 'Success' >SUBMIT</Button>
        </form>
      </div>
    );
  }
}
export default Auth;
