import React from 'react';
import './FormStep.css';
import { _technoHelper } from '../../_helper/technoHelper';

class FormStep extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="form-step-container">
                <SingleStep
                    stepNumber={1}
                    stepDescription={_technoHelper.STEP_DESCRIPTION_CHOOSE_TECHNO}
                    stepConf={this.props.firstStep} />
                <SingleStep
                    stepNumber={2}
                    stepDescription={_technoHelper.STEP_DESCRIPTION_ADD_LOCAL_PATH}
                    stepConf={this.props.secondStep} />
            </div>
        )
    }
}

class SingleStep extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let style = !this.props.stepConf
            ? { backgroundColor: _technoHelper.BLACK_COLOR } : {};
        let classname = this.props.stepConf
            ? _technoHelper.CLASSNAME_ACTIVE_STEP : ""

        return (
            <div className={'single-step ' + classname}>
                <div className="single-step__step-number" style={style}>
                    <span>{this.props.stepNumber}</span>
                </div>
                <div className="single-step__step-description">
                    <p>{this.props.stepDescription}</p>
                </div>
            </div>
        )
    }
}

export default FormStep;
