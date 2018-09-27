import React, { Component } from 'react'
import Header from './Header'

class LoginContainer extends Component {
    state = {
        email: '',
        password: '',
        error: '',
    }

    handleEmailChange = e => this.setState({ email: e.target.value })

    handlePasswordChange = e => this.setState({ password: e.target.value })

    handleSubmit = e => {
        e.preventDefault()
        if (this.state.email && this.state.password) {
            this.login()
        } else {
            this.setState({ error: 'Please fill in both fields.' })
        }
    }

    login() {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                this.setState({ error: "" })
                console.log(res)
            })
            .catch(err => {
                if (err.code === 'auth/user-not-found') {
                    this.signup()
                } else {
                    this.setState({ error: err.message })
                }
            })
    }

    signup() {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => console.log(res))
            .catch(err => {
                console.log(err)
                this.setState({ error: 'Error signing up.' })
            })
    }

    render() {
        return (
            <div id="LoginContainer" className="inner-container">
                <Header />
                <form onSubmit={this.handleSubmit}>
                    <p>Sign in or sign up by entering your email and password.</p>
                    <input 
                        type="text" 
                        onChange={this.handleEmailChange}
                        value={this.state.email}
                        placeholder="Your email"
                    />
                    <input 
                        type="password"
                        onChange={this.handlePasswordChange}
                        value={this.state.password}
                        placeholder="Your password"
                    />
                    <p className="error">{this.state.error}</p>
                    <button className="red light" type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export default LoginContainer