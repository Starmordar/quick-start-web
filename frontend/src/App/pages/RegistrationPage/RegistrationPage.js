import React from 'react';
import './RegistrationPage.css';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="registration-section">
                <div className="container h-100">
                    <div className="row justify-content-around h-100">

                        <div className="registration-section__brief-info-container col-7">

                        </div>

                        <div className="registration-section__form-container col-4">
                            <RegistrationForm />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrationPage;
