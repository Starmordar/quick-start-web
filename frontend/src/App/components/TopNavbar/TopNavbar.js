import React from 'react';
import './TopNavbar.css';

class TopNavbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <nav class="navbar">
                <a class="navbar-brand">Starmordar</a>
                <button class="btn btn-outline-light my-2 my-sm-0" type="button">Sign out</button>
            </nav>
        )
    }
}

export default TopNavbar;
