import React from 'react';
import CardList from '../components/CardList';
// robots import uses destructuring because. Robots import became unnecessary when switching to an online source for user data. 
//import {robots} from './robots';
import SearchBox from '../components/SearchBox';
//css files do not need to be imported with a variable name!
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'

class App extends React.Component {
    constructor(){
        //*README* use super() to generate the prototype chain and populate the 'this' keyword.
        super()
        this.state = {
            //the robots file was removed as a source of users and replaced with an online resource for random users
            //robots: robots,
            robots:[],
            searchfield:''   
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(response => {
            //convert response to json
            return response.json();
        })
        .then(users => {
            this.setState({robots: users});
        })
        //using the old robots.js file
        //this.setState({robots: robots})
    }

    //*README* use arrow functions instead of method declarations in order to make the 'this' keyword in the method lexically(where it is written in code) instead of dynamically(defined by whomever invokes it) bound
    onSearchChange = (event) => {

        //place the contents of the searchbox into state property 'searchfield' so that it may be compared with the list of robots to create a filtered list stored in the 'filteredRobots' constant in the render method.
        //*README* the setState method is provided by react to prevent breaking state as a result of incongruent timing of changes to state. This makes sure all changes happen in the correct order and timing and no conflicts occur.
        this.setState({searchfield: event.target.value});

    }

    render(){

        //this is made possible by setting the value of the searchfield property in state via the 'onSearchChange' method.
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if(!this.state.robots.length){
            return (<h1>Loading...</h1>)
        }
        else{
            return(
                <div className="tc">
                    <h1 className="f2">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
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

export default App;