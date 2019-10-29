import React from 'react';
import './RegistrationPage.css';

import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

import { DEFAULT_LOADER, HIDE_CLASSNAME, Loader } from '../../_helper/loader';
const loader = new Loader(DEFAULT_LOADER, HIDE_CLASSNAME);

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillUnmount() {
        loader.showLoader()
    }

    componentDidMount() {
        setTimeout(() => {
            loader.hideLoader()
        }, 500)
    }

    render() {
        return (
            <div className="registration-section">
                <div className="container h-100">
                    <div className="row justify-content-around h-100">

                        <div className="registration-section__brief-info-container col-7">

                        </div>

                        <div className="registration-section__form-container col-4">
                            <h2 className="registration-header">Join SquidSquad today</h2>
                            <RegistrationForm history={this.props.history} />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrationPage;
