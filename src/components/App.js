import React, { Component } from 'react'
import LoginContainer from './LoginContainer'
import './app.css'

class App extends Component {
    state = {
        user: null,
    }

    componentDidMount() {
        firebase.auth().onAuthChanged(user => user ? this.setState(user) : null)
    }

    render() {
        return (
            <div id="container" className="inner-container">
              <LoginContainer />
            </div>
        )
    }
}

export default App