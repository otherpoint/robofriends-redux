import React, {Component} from 'react';
import CardList from '../components/CardList';
// robots import uses destructuring because. Robots import became unnecessary when switching to an online source for user data. 
//import {robots} from './robots';
import SearchBox from '../components/SearchBox';
//css files do not need to be imported with a variable name!
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
//import actions for use
import {requestRobots, setSearchField} from '../actions';
//import the connect method. The connect method is used to make components aware of changes to the redux store.
import {connect} from 'react-redux';


//define mapStateToProps for use by the connect method. Because the store was initialize based on the initial state provided to the searchRobots reducer function in reducers.js the value of the 
//'state' argument passed here will be that which is produced by the searchRobots reducer(the searchRobots reduce injects the searchbox text value into the state property 'searchField' and returns the new state object to be used here).
const mapStateToProps = state => {
    return {
        //set the searchfield property value. it is not simply 'state.searchField' because when all reducers are combined into a reducer, each reducer becomes a nested object named for the reducer within the main store object
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

//no idea how the dispatch parameter is populated with an argument here or from where the value comes
const mapDispatchToProps = (dispatch) => {
    return { 
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        //redux thunk will notice that this returns a function instead of an object
        onRequestRobots:  () => dispatch(requestRobots())
    }
}

class App extends Component {
    //constructor is no longer necessary because state is handled by redux

    componentDidMount() {
        //this.props is populated by the mapStateToProps function and the mapDispatchToProps function.
        //invoke the onRequestRobots handler as defined in the mapDispatchToProps function.
        this.props.onRequestRobots();
    }

    render(){

        const { searchField, onSearchChange, robots, isPending } = this.props;

        //this is made possible by setting the value of the searchfield property in state via the 'onSearchChange' method.
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        if(isPending){
            return (<h1>Loading...</h1>)
        }
        else{
            return(
                <div className="tc">
                    <h1 className="f2">RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            )   
        }
    }
}

//connect is a higher order function which will then return another function which will be called with 'App'. The below export will make sure that this component is aware of changes to the store
export default connect(mapStateToProps,mapDispatchToProps)(App);