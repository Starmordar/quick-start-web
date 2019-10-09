import React from 'react';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

const { _helper } = require('../../_helper/authValidation');
const { _serverHelper } = require('../../_helper/serverReponce');

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
            },
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    handleChange(event) {
        _helper.updateValueInFormInput(this, event);
    }

    onSubmitHandler(event) {
        event.preventDefault();

        const componentContext = this;

        if (_helper.isValidForm(this)) {

            let userData = {
                username: this.state.userData.username,
                password: this.state.userData.password
            }

            _serverHelper.userSignIn(componentContext, userData)
        }
    }

    componentDidMount() {
        const componentContext = this;

        _serverHelper.redirectToHomeIfUserAlreadyOnTheSystem(componentContext);
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler}>
                {this.state.redirect ? <Redirect to='/' /> : null}

                <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input name="username"
                        type="text"
                        className="form-control"
                        value={this.state.username}
                        id="usernameInput"
                        placeholder="Enter username"
                        onChange={this.handleChange} />
                    {
                        this.state.userDataErr.usernameErr.isErr ?
                            <ErrorLabel
                                text={this.state.userDataErr.usernameErr.errDescription} />
                            : null
                    }
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
                    {
                        this.state.userDataErr.passwordErr.isErr ?
                            <ErrorLabel
                                text={this.state.userDataErr.passwordErr.errDescription} />
                            : null
                    }
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
