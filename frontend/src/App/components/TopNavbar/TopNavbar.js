import React from 'react';
import { Redirect } from 'react-router-dom';
import './TopNavbar.css';

import { _serverHelper } from '../../_helper/serverReponce'
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

    render() {
        return (
            <nav className="navbar">
                {this.state.redirect ? <Redirect to='/auth' /> : null}

                <a className="navbar-brand">Starmordar</a>
                <button className="btn btn-outline-light my-2 my-sm-0"
                    type="button"
                    onClick={this.handleSignOut}>Sign out</button>
            </nav>
        )
    }
}

export default TopNavbar;
