import React, {Component} from 'react';

class ErrorBoundry extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasError:false
        }

    }

    //this lifecycle hook allows react to respond to an error in a component.
    componentDidCatch() {
        this.setState({hasError:true})
    }

    render(){
        if(this.state.hasError){
            return <h1>Oops, that's not good.</h1>
        }
        return this.props.children;
    }
}

export default ErrorBoundry;