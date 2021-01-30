//import the constant 'CHANGE_SEARCH_FIELD' from constants.js for use within the 'setSearchField' action
import {CHANGE_SEARCH_FIELD,REQUEST_ROBOTS_PENDING,REQUEST_ROBOTS_SUCCESS,REQUEST_ROBOTS_FAILED} from './constants';

//Create the 'setSearchField' action
//An arrow function that returns an object, making this an 'action creator'. The object is wrapped in parenthesis so it is not confused with a function body of multiple lines, and is therefore automatically returned as the result of the arrow function.
export const setSearchField = (text) => ({
    //set the type to the 'CHANGE_SEARCH_FIELD' constant
    type: CHANGE_SEARCH_FIELD,
    payload: text
})

//this action is a thunk. It is a higher order function in that it returns a function instead of the normal action object.
export const requestRobots = () => (dispatch) => {
    dispatch({type: REQUEST_ROBOTS_PENDING});
    fetch('https://jsonplaceholder.typicode.com/users').then(response => {
        //convert response to json
        return response.json();
    })
    .then(users => {
        dispatch({type: REQUEST_ROBOTS_SUCCESS, payload: users})
    })
    .catch(error => dispatch({type: REQUEST_ROBOTS_FAILED, payload: error}))
}