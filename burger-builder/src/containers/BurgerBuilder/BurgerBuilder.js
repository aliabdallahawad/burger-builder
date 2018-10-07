import React, { Component } from 'react';
import Aux from './../../hoc/Aux';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4.0,
        purchasable: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => sum + el, 0);
        
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type]++;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.updatePurchaseState(updatedIngredients);
        this.setState({totalPrice: updatedPrice, ingredients: updatedIngredients});
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] === 0) { return; }

        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type]--;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.updatePurchaseState(updatedIngredients);
        this.setState({totalPrice: updatedPrice, ingredients: updatedIngredients});
    }

    render() {
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable} />
            </Aux>
        );
    }
}

export default BurgerBuilder;