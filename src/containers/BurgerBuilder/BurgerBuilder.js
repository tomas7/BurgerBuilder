import React, { Component } from 'react';

import Aux from 'react-aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import classnames from 'classnames'
import myClass from './BurgerBuilder.module.css'

import * as actionTypes from '../../store/actions/actions'
import * as actionTypes_ from '../../store/actions/actionTypes'
import {connect} from 'react-redux'



class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            // salad: 0,
            // bacon: 0,
            // cheese: 0,
            // meat: 0
        },
        // totalPrice: 4,
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    classNames = classnames('testme');

    componentDidMount () {
        console.log(this.props);
        this.props.onInitIngredience()
    }

    updatePurchaseState () {
        const sum = Object.keys( this.props.ingr )
            .map( igKey => {
                return this.props.ingr[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
      
    }

   
    purchaseHandler = () => {
        this.setState( { purchasing: true } );
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render () {
        const disabledInfo = {
            ...this.props.ingr
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        let sun = <div>Off</div>

        if (this.props.light) {
            sun = <div>On</div>
        }else if (!this.props.light) {
            sun = <div>Off</div>
        }


        if ( this.props.ingr ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingr} />
                    <BuildControls
                        ingredientAdded={this.props.ingredienceAdded}
                        ingredientRemoved={this.props.ingredienceRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState()}
                        ordered={this.purchaseHandler}
                        price={this.props.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingr}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                {/* {sun} */}
                {/* <button className="testme" onClick={() => this.props.sunOn(true)}>Turn Light on</button>
                <button onClick={() => this.props.sunOff(false)}>Turn Light off</button>
                <button onClick={() => this.props.toggleSun()}>Turn Light off</button> */}
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        ingr: state.ingredients,
        totalPrice: state.totalPrice,
        light: state.light,
        error: state.error
    }
}

const mapDispatcheToProps = dispatch => {
    return {
        onInitIngredience: () => dispatch (actionTypes_.initAllIngredience()),
        ingredienceAdded: (ingrName) => dispatch(actionTypes_.addIngredience(ingrName)),
        ingredienceRemoved: (ingrName) => dispatch(actionTypes_.removeIngredience(ingrName)),
        sunOn: (light) => dispatch({type: actionTypes.LIGHT_ON, 
           
           lightStatus: light
        }),sunOff: (light) => dispatch({type: actionTypes.LIGHT_OFF, 
           
            lightStatus: light
         }),
         toggleSun: () => dispatch({type: actionTypes.LIGHT_TOGGLE, 
          
         }),
    }
}
export default connect(mapStateToProps, mapDispatcheToProps)(withErrorHandler( BurgerBuilder, axios ));