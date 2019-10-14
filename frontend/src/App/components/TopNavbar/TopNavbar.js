import React from 'react';
import './TopNavbar.css';

class TopNavbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <nav className="navbar">
                <a className="navbar-brand">Starmordar</a>
                <button className="btn btn-outline-light my-2 my-sm-0" type="button">Sign out</button>
            </nav>
        )
    }
}

export default TopNavbar;
