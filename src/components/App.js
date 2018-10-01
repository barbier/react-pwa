import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import LoginContainer from './LoginContainer'
import ChatContainer from './ChatContainer'
import UserContainer from './UserContainer'
import './app.css'

class App extends Component {
    state = {
        user: null,
        messages: [],
        messagesLoaded: false,
    }

    handleSubmitMessage = msg => {
        const data = {
            msg,
            author: this.state.user.email,
            user_id: this.state.user.uid,
            timestamp: Date.now()
        }
        firebase
            .database()
            .ref('messages/')
            .push(data)
    }

    onMessage = snapshot => {
        const messages = Object.keys(snapshot.val()).map(key => {
            const msg = snapshot.val()[key]
            msg.id = key
            return msg
        })
        this.setState({ messages })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({user})
            } else {
                this.props.history.push('/login')
            }
        })
        firebase
            .database()
            .ref('/messages')
            .on('value', snapshot => {
                this.onMessage(snapshot)
                if (!this.state.messagesLoaded) {
                    this.setState({ messagesLoaded: true })
                }
            })
    }

    render() {
        return (
            <div id="container" className="inner-container">
                <Route path="/login" component={LoginContainer} />
                <Route
                    exact
                    path="/"
                    render={() => (
                        <ChatContainer 
                            messages={this.state.messages}
                            messagesLoaded={this.state.messagesLoaded}
                            user={this.state.user}
                            onSubmit={this.handleSubmitMessage}
                        />)}
                />
                <Route
                    path="/users/:id"
                    render={({ history, match }) => (
                        <UserContainer
                            messages={this.state.messages}
                            messagesLoaded={this.state.messagesLoaded}
                            userID={match.params.id}
                        />
                    )}
                />
            </div>
        )
    }
}

export default withRouter(App)