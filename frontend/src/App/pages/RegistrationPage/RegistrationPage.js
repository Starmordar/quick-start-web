import React from 'react';
import './RegistrationPage.css';

import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

import { DEFAULT_LOADER, HIDE_CLASSNAME, Loader } from '../../_helper/loader';
import { _helper } from '../../_helper/authValidation';
const loader = new Loader(DEFAULT_LOADER, HIDE_CLASSNAME);

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props)

        this.handleRedirectToAuthPage = this.handleRedirectToAuthPage.bind(this)
    }

    handleRedirectToAuthPage() {
        this.props.history.push(_helper.PATH_AUTH_PAGE);
    }

    componentWillUnmount() {
        loader.showLoader()
    }

    componentDidMount() {
        setTimeout(() => {
            loader.hideLoader()
        }, _helper.LOADER_TIME_FADE_OUT_MS)
    }

    render() {
        return (
            <>
                <div className="authentification">
                    <p className="authentification__warn">Already have account?&nbsp;&nbsp;&nbsp;
                        <span
                            className="authentification__link-to-page text-primary"
                            onClick={this.handleRedirectToAuthPage}>Sign In
                        </span>
                    </p>
                </div>

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
            </>
        )
    }
}

export default RegistrationPage;
