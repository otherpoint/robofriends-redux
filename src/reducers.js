import {CHANGE_SEARCH_FIELD,REQUEST_ROBOTS_PENDING,REQUEST_ROBOTS_SUCCESS,REQUEST_ROBOTS_FAILED} from './constants';

//the the initial state object to be kept in the redux store
const initialState = {
    searchField:''
}

//Create the reducer function to handle searching for robots. The parameters here are given defaults via the ES6 feature. The state is defaulted to the initial state constant and action is defaulted to an empty object.
//
export const searchRobots = (state=initialState, action={}) => {
    switch(action.type){
        case CHANGE_SEARCH_FIELD:
            //use Object.assign to merge the new searchField value into the state object
            //return Object.assign({}, state, {searchField: action.payload})
            //use the object spread operator to generate the new state object instead of Object.assign. Much cleaner.
            return {...state, searchField: action.payload}
            default:
                return state;
    }
}

//create the initial state for the requestRobots reducer
const initialStateRobots = {
    isPending:false,
    robots:[],
    error: ''
}


export const requestRobots = (state=initialStateRobots, action={}) => {
    switch(action.type) {
        case REQUEST_ROBOTS_PENDING:
            return {...state, isPending: true}
        case REQUEST_ROBOTS_SUCCESS:
            return {...state, robots: action.payload, isPending: false}
        case REQUEST_ROBOTS_FAILED:
            return {...state, error: action.payload, isPending: false}
        default:
            return state
    }
}

