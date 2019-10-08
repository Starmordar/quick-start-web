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
        const targetName = event.target.name,
            targetValue = event.target.value

        this.setState(prevState => {
            let data = Object.assign({}, prevState);

            data.userData[targetName] = targetValue

            return { data }
        });
    }

    isValidForm() {
        _helper.resetErrMsg(this);

        if (_helper.isEmptyFields(this)) return false;

        if (!_helper.isValidEmail(this)) return false;

        if (!_helper.isValidPassword(this)) return false;

        if (!_helper.isEqualsPassword(this)) return false;

        if (!_helper.isValidUsername(this)) return false;

        return true;
    }

    onSubmitHandler(event) {
        event.preventDefault();

        let context = this;
        if (this.isValidForm()) {
            axios.get('http://localhost:4000/registration', {
                params: {
                    username: this.state.userData.username,
                    email: this.state.userData.email,
                    password: this.state.userData.password
                }
            }).then(function (response) {
                _helper.resetErrMsg(context);

                if (response.data === 'email already taken') {
                    _helper.setErrMsg(context, 'emailErr', response.data)
                }
                if (response.data === 'a user with that nickname already exists') {
                    _helper.setErrMsg(context, 'usernameErr', response.data)
                }

                if (response.data === 'User create successful') {
                    context.setState({ redirect: true })
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
