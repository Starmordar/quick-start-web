import React from 'react';
import './LoginPage.css';
import LoginForm from '../../components/LoginForm/LoginForm';

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="wall-image">
                <div className="form-container">
                    <LoginForm />
                </div>
            </div>
        )
    }
}

export default LoginPage;
