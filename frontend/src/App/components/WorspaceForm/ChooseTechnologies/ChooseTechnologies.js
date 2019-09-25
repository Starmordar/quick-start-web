import React from 'react';
import './ChooseTechnologies.css';

class ChooseTechnologies extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="choose-technologies-form">
                <header className="setup-form-info">
                    <h2 className='step-description'>Select technologies</h2>
                    <h3 className="step-helper">Choose browser and other programs</h3>
                </header>

                <div className="browser-selection">
                    <BrowserCard />
                    <BrowserCard />
                    <BrowserCard />
                    <BrowserCard />
                </div>
            </div>
        )
    }
}


class BrowserCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="browser-card col-3">
                <div className="card-border">
                    <img src="https://cdn0.iconfinder.com/data/icons/jfk/512/chrome-512.png" width="140px" height="140px"></img>
                    <h5 className="browser-description"> Google Chrome</h5>
                </div>
            </div>
        )
    }
}


export default ChooseTechnologies;
