import React from 'react';
import './Registration.css';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

class Registration extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="wall-image">
                <div className="form-container">
                    <RegistrationForm />
                </div>
            </div>
        )
    }
}

export default Registration;
