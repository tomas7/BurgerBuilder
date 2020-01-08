import * as actionTypes from '../actions/actions'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    light: false 
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


const reducer = (state = initialState, actions) => {
    console.log(state.purchasable);
    switch( actions.type ) {
        case actionTypes.GET_ALL_ERROR_INGREDIENCE:
            return {
                ...state,
                error: true
            }
        // case actionTypes.SHOW_SPINNER:
        // return {
        //     ...
        // }
        case actionTypes.GET_ALL_INGREDIENCE:
            return {
                ...state,
                ingredients:actions.ingredients,
                error: false
            }
        case actionTypes.LIGHT_TOGGLE:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients
                },
                totalPrice: state.totalPrice,
                light: !state.light
            };
        case actionTypes.LIGHT_ON:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients
                },
                totalPrice: state.totalPrice,
                light: actions.lightStatus
            };
            case actionTypes.LIGHT_OFF:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients
                },
                totalPrice: state.totalPrice,
                light: actions.lightStatus
            };
        case actionTypes.ADD_INGREDIENCE:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [actions.ingredienceName]: state.ingredients[actions.ingredienceName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[actions.ingredienceName],
               
            };
        case actionTypes.REMOVE_INGREDIENCE:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [actions.ingredienceName]: state.ingredients[actions.ingredienceName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[actions.ingredienceName],
            
        };
        default:
            return state;
    }
    
}

export default reducer;