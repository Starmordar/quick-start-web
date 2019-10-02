import React from 'react';
import './RegistrationForm.css';

const axios = require('axios');
axios.defaults.withCredentials = true;

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameErr: '',
            isUsernameErr: false,
            passwordErr: '',
            isPasswordErr: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    handleChange(event) {
        const targetName = event.target.name;
        this.setState({ [targetName]: event.target.value });
    }

    isValidForm() {
        this.setState({ isUsernameErr: false, isPasswordErr: false });

        if (this.state.username === '') {
            this.setState({
                isUsernameErr: true,
                usernameErr: "Username field can't be empty"
            });
            return false
        }

        if (this.state.password === '') {
            this.setState({
                isPasswordErr: true,
                passwordErr: "Password field can't be empty",
            })
            return false
        }

        return true;
    }

    onSubmitHandler(event) {
        event.preventDefault();

        if (this.isValidForm()) {

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

export default RegistrationForm;
