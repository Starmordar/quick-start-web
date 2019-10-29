import React from 'react';
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
            redirect: false,
            passwordInputType: "password"
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAuthentificationSubmit = this.handleAuthentificationSubmit.bind(this);
        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.handleButtonRelease = this.handleButtonRelease.bind(this);
    }

    handleInputChange(event) {
        _helper.updateValueInFormInput(this, event);
    }

    handleAuthentificationSubmit(event) {
        event.preventDefault();

        const componentContext = this;
        if (_helper.isValidUserData(this)) {

            let userData = {
                username: this.state.userData.username,
                password: this.state.userData.password
            }

            _serverHelper.userSignIn(componentContext, userData)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.redirect === !this.state.redirect) {
            this.props.history.push(_helper.PATH_HOME_PAGE);
        }
    }

    componentDidMount() {
        const componentContext = this;

        _serverHelper.redirectToHomeIfUserAlreadyOnTheSystem(componentContext);
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
        let userNameInput = "", passwordInput = "";

        if (this.state.userDataErr.usernameErr.isErr)
            userNameInput = _helper.CLASSNAME_INVALID_INPUT
        if (this.state.userDataErr.passwordErr.isErr)
            passwordInput = _helper.CLASSNAME_INVALID_INPUT

        return (
            <form className="authentification-from" onSubmit={this.handleAuthentificationSubmit}>

                <div className="form-group">
                    <label className="auth-label" htmlFor="usernameInput">Username</label>
                    <input name="username"
                        type="text"
                        className={"form-control " + userNameInput}
                        value={this.state.username}
                        id="usernameInput"
                        placeholder="Enter username"
                        onChange={this.handleInputChange} />
                    {
                        this.state.userDataErr.usernameErr.isErr ?
                            <ErrorLabel
                                text={this.state.userDataErr.usernameErr.errDescription} />
                            : null
                    }
                </div>

                <div className="form-group">
                    <label className="auth-label" htmlFor="passwordInput">Password</label>
                    <input name="password"
                        type={this.state.passwordInputType}
                        className={"form-control " + passwordInput}
                        value={this.state.password}
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
                        this.state.userDataErr.passwordErr.isErr ?
                            <ErrorLabel
                                text={this.state.userDataErr.passwordErr.errDescription} />
                            : null
                    }
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign in</button>

            </form>
        )
    }
}

function ErrorLabel(props) {
    return (
        <small id="emailHelp" className="form-text text-danger error-label">{props.text}</small>
    )
}

export default LoginForm;
