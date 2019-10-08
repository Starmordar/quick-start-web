import React from 'react';
import { Redirect } from 'react-router-dom';
import './RegistrationForm.css';

const axios = require('axios');
const { _helper } = require('../../_helper/authValidation')

axios.defaults.withCredentials = true;

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userData: {
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            },
            userDataErr: {
                usernameErr: { isErr: false, errDescription: "" },
                emailErr: { isErr: false, errDescription: "" },
                passwordErr: { isErr: false, errDescription: "" },
                confirmPasswordErr: { isErr: false, errDescription: "" }
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
            
            axios.get('http://localhost:4000/registration', {
                params: {
                    username: this.state.userData.username,
                    email: this.state.userData.email,
                    password: this.state.userData.password
                }
            }).then(function (response) {
                _helper.resetErrorMessages(componentContext);

                if (response.data === 'email already taken') {
                    _helper.setErrorMessageOnInputField(componentContext, 'emailErr', response.data)
                }
                if (response.data === 'a user with that nickname already exists') {
                    _helper.setErrorMessageOnInputField(componentContext, 'usernameErr', response.data)
                }

                if (response.data === 'User create successful') {
                    componentContext.setState({ redirect: true })
                }
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    componentDidMount() {
        let context = this;
        axios.get('http://localhost:4000/')
            .then(function (response) {
                if (response.data === "Already-registered") {
                    context.setState({ redirect: true })
                }
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
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
                    <label htmlFor="emailInput">Email</label>
                    <input name="email"
                        type="text"
                        className="form-control"
                        id="emailInput"
                        placeholder="Email"
                        onChange={this.handleChange} />
                    {
                        this.state.userDataErr.emailErr.isErr ?
                            <ErrorLabel
                                text={this.state.userDataErr.emailErr.errDescription} />
                            : null
                    }
                </div>

                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input name="password"
                        type="password"
                        className="form-control"
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

                <div className="form-group">
                    <label htmlFor="passwordInput">Confirm password</label>
                    <input name="confirmPassword"
                        type="password"
                        className="form-control"
                        id="confirm-passwordInput"
                        placeholder="Confirm password"
                        autoComplete="on"
                        onChange={this.handleChange} />
                    {
                        this.state.userDataErr.confirmPasswordErr.isErr ?
                            <ErrorLabel
                                text={this.state.userDataErr.confirmPasswordErr.errDescription} />
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

export default RegistrationForm;
