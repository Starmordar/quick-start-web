import React from 'react';
import './FormStep.css';

class FormStep extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="form-step-container">
                <SingleStep />
                <SingleStep />
                <SingleStep />
            </div>
        )
    }
}


class SingleStep extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='single-step'>
                <div className="single-step__step-number">
                    <span>1</span>
                </div>
                <div className="single-step__step-description">
                    <p>WORKSPACE SETUP</p>
                </div>
            </div>
        )
    }
}

export default FormStep;
