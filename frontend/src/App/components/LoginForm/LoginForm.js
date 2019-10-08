import React from 'react';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

const axios = require('axios');
axios.defaults.withCredentials = true;

const { _helper } = require('../../_helper/authValidation')

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                username: '',
                password: '',
            },
            userDataErr: {
                usernameErr: { isErr: false, errDescription: "" },
                passwordErr: { isErr: false, errDescription: "" },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    handleChange(event) {
        _helper.updateValueInFormInput(this, event);
    }

    onSubmitHandler(event) {
        event.preventDefault();

        if (_helper.isValidForm(this)) {

            axios.get('http://localhost:4000/auth', {
                params: {
                    username: this.state.username,
                    password: this.state.password
                }
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/')
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler}>

                <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input name="username"
                        type="text"
                        className="form-control"
                        value={this.state.username}
                        id="usernameInput"
                        placeholder="Enter username"
                        onChange={this.handleChange} />
                    {this.state.isUsernameErr ? <ErrorLabel text={this.state.usernameErr} /> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input name="password"
                        type="password"
                        className="form-control"
                        value={this.state.password}
                        id="passwordInput"
                        placeholder="Password"
                        autoComplete="on"
                        onChange={this.handleChange} />
                    {this.state.isPasswordErr ? <ErrorLabel text={this.state.passwordErr} /> : null}
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>

            </form>
        )
    }
}

function ErrorLabel(props) {
    return (
        <small id="emailHelp" className="form-text text-muted">{props.text}</small>
    )
}

export default LoginForm;
