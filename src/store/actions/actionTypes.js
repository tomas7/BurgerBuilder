import * as action from './actions';
import axios from '../../axios-orders';

export const addIngredience = (name) => {
    return {
        type: action.ADD_INGREDIENCE,
        ingredienceName: name
    };
};
export const removeIngredience = (name) => {
    return {
        type: action.REMOVE_INGREDIENCE,
        ingredienceName: name
    };
};

export const getAllIngredience = (ing) => {
    return {
        type: action.GET_ALL_INGREDIENCE,
        ingredients: ing
    };
};

export const getAllIngredienceError = () => {
    return {
        type: action.GET_ALL_ERROR_INGREDIENCE,
    };
};

export const showSpinner = () => {
    return{
        type: action.SHOW_SPINNER
    }
}

export const initAllIngredience = () => {
    return dispatch => {
        axios.get( 'https://testre-6a510.firebaseio.com/Ingredience.json' )
        .then( response => {
            dispatch(getAllIngredience(response.data));
           
        } )
        .catch( error => {

            dispatch(getAllIngredienceError());
        } );
    };
};