import React from 'react';
import './RegistrationForm.css';

const { _helper } = require('../../_helper/authValidation');
const { _serverHelper } = require('../../_helper/serverReponce');

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

            redirect: false,
            passwordInputType: "password"
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.handleButtonRelease = this.handleButtonRelease.bind(this);
    }

    handleInputChange(event) {
        _helper.updateValueInFormInput(this, event);
    }

    handleRegistrationSubmit(event) {
        event.preventDefault();

        const _self = this;
        if (_helper.isValidUserData(this)) {
            const userData = {
                username: this.state.userData.username,
                email: this.state.userData.email,
                password: this.state.userData.password
            }

            _serverHelper.userRegistration(_self, userData);
        }
    }

    componentDidMount() {
        const _self = this;

        _serverHelper.redirectToHomeIfUserAlreadyOnTheSystem(_self);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.redirect === !this.state.redirect) {
            this.props.history.push(_helper.PATH_HOME_PAGE);
        }
    }

    handleButtonPress() {
        this.setState({
            passwordInputType: "text"
        })
    }

    handleButtonRelease() {
        this.setState({
            passwordInputType: "password"
        })
    }

    render() {
        let userNameInput = "",
            emailInput = "",
            passwordInput = "",
            confirmPasswordInput = "";

        if (this.state.userDataErr.usernameErr.isErr)
            userNameInput = _helper.CLASSNAME_INVALID_INPUT
        if (this.state.userDataErr.emailErr.isErr)
            emailInput = _helper.CLASSNAME_INVALID_INPUT
        if (this.state.userDataErr.passwordErr.isErr)
            passwordInput = _helper.CLASSNAME_INVALID_INPUT
        if (this.state.userDataErr.confirmPasswordErr.isErr)
            confirmPasswordInput = _helper.CLASSNAME_INVALID_INPUT

        return (
            <form className="registration-form" onSubmit={this.handleRegistrationSubmit}>

                <div className="form-group">
                    <label className="registration-label" htmlFor="usernameInput">Username</label>
                    <input
                        name="username"
                        type="text"
                        className={"form-control " + userNameInput}
                        id="usernameInput"
                        placeholder="Enter username"
                        onChange={this.handleInputChange} />
                    {
                        this.state.userDataErr.usernameErr.isErr
                            ? <ErrorLabel
                                text={this.state.userDataErr.usernameErr.errDescription} />
                            : null
                    }
                </div>

                <div className="form-group">
                    <label className="registration-label" htmlFor="emailInput">Email address</label>
                    <input name="email"
                        type="text"
                        className={"form-control " + emailInput}
                        id="emailInput"
                        placeholder="Enter email"
                        onChange={this.handleInputChange} />
                    {
                        this.state.userDataErr.emailErr.isErr
                            ? <ErrorLabel
                                text={this.state.userDataErr.emailErr.errDescription} />
                            : null
                    }
                </div>

                <div className="form-group">
                    <label className="registration-label" htmlFor="passwordInput">Create a password</label>
                    <input name="password"
                        type={this.state.passwordInputType}
                        className={"form-control " + passwordInput}
                        id="passwordInput"
                        placeholder="Enter password"
                        autoComplete="on"
                        onChange={this.handleInputChange} />

                    <img src={require("../../assets/images/eye.png")}
                        height="25px" width="25px"
                        className="show-password"
                        onTouchStart={this.handleButtonPress}
                        onTouchEnd={this.handleButtonRelease}
                        onMouseDown={this.handleButtonPress}
                        onMouseUp={this.handleButtonRelease}
                        onMouseLeave={this.handleButtonRelease}>
                    </img>
                    {
                        this.state.userDataErr.passwordErr.isErr
                            ? <ErrorLabel
                                text={this.state.userDataErr.passwordErr.errDescription} />
                            : null
                    }
                </div>

                <div className="form-group">
                    <label className="registration-label" htmlFor="confirm-passwordInput">Confirm password</label>
                    <input name="confirmPassword"
                        type="password"
                        className={"form-control " + confirmPasswordInput}
                        id="confirm-passwordInput"
                        placeholder="Confirm password"
                        autoComplete="on"
                        onChange={this.handleInputChange} />
                    {
                        this.state.userDataErr.confirmPasswordErr.isErr
                            ? <ErrorLabel
                                text={this.state.userDataErr.confirmPasswordErr.errDescription} />
                            : null
                    }
                </div>

                <button type="submit" className="btn btn-primary btn-block ">Create your account</button>
            </form>
        )
    }
}

function ErrorLabel(props) {
    return (
        <small id="emailHelp" className="form-text text-danger error-label">{props.text}</small>
    )
}

export default RegistrationForm;
