import React from 'react';
import './LoginPage.css';

import LoginForm from '../../components/LoginForm/LoginForm';

import { DEFAULT_LOADER, HIDE_CLASSNAME, Loader } from '../../_helper/loader';
const { _helper } = require('../../_helper/authValidation');
const loader = new Loader(DEFAULT_LOADER, HIDE_CLASSNAME)

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
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
            <div className="wall-image">
                <div className="container">
                    <div className="row">
                        <div className="form-container">

                            <div className="create-new-account">
                                <span className="create-new-account__link text-primary">Create account</span>
                            </div>

                            <div className="auth-header">
                                <img src={require("../../assets/images/octopus.png")}
                                    className="card-img" alt="logo" width="80px" height="80px" />
                                <h5 className="auth-header__info">Log in to SquidSquad</h5>
                            </div>

                            <LoginForm history={this.props.history} />

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;
