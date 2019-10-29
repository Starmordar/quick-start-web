import React from 'react';
import './TopNavbar.css';

import { _serverHelper } from '../../_helper/serverReponce'
import { _helper } from '../../_helper/authValidation';

class TopNavbar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }

        this.handleSignOut = this.handleSignOut.bind(this)
    }

    handleSignOut() {
        _serverHelper.signOut(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.redirect === !this.state.redirect) {
            this.props.history.push(_helper.PATH_AUTH_PAGE);
        }
    }

    render() {
        return (
            <nav className="navbar">

                <a className="navbar-brand">Starmordar</a>

                <button
                    className="btn btn-outline-light my-2 my-sm-0"
                    type="button"
                    onClick={this.handleSignOut}>Sign out</button>

            </nav>
        )
    }
}

export default TopNavbar;
