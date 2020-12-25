import React, { Component } from "react";
import {connect} from 'react-redux';

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error:false,
  };
  // componentDidMount() {
  //   axios
  //     .get(
  //       "https://react-my-burger-914a5-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
  //     )
  //     .then((response) => {
  //       this.setState({ ingredients: response.data });
  //     });
  // }

  updatePurchaseState(ingredients) {
    // const ingredients = {
    //   ...this.state.ingredients,
    // };
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    //If sum>0 : purchasable=true
    
    return sum > 0;
  }
  
  

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
  };

  render() {
    const disabledInfo = {
      // ...this.state.ingredients,
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      //if disabledInfo[key]<=0 :true
      //if disabledInfo[key]>0 :false
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = <Spinner />;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredient={this.props.ings}
          price={this.props.price}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
}

const mapDispatchProps = dispatch => {
  return {
    onAddIngredient: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
    onRemoveIngredient: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName:ingName}),
  }
}
export default connect(mapStateToProps,mapDispatchProps)(withErrorHandler(BurgerBuilder, axios));
