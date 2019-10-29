import React from 'react';
import { Redirect } from 'react-router-dom';
import './InputForm.css';

import { _technoHelper } from '../../../_helper/technoHelper';
import { _serverHelper } from '../../../_helper/serverReponce';
import { _helper } from '../../../_helper/authValidation';

class InputForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            technologiesData: {},
            browserData: {},
            currentBrowser: "",

            technoError: "",
            browserError: "",

            redirect: false
        }
    }

    returnToPreviousForm = () => {
        this.props.callback();
    }

    handleSubmitWorkspace = () => {
        let dataToUpdate = {
            technologiesData: this.state.technologiesData,
            browserData: this.state.browserData,
            currentBrowser: this.state.currentBrowser
        }

        if (_technoHelper.isValidBrowserURLs(this, this.props.browser, this.state.browserData) &&
            _technoHelper.isValidLinuxFolderValidation(this, this.state.technologiesData, this.props.technologies)) {
            _serverHelper.updateExistingWorkspace(dataToUpdate)
                .then((responce) => {
                    if (responce === _serverHelper.SERVER_WORKSPACE_UPDATED_SUCCESSFUL) {
                        this.setState({
                            redirect: !this.state.redirect
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    handleInputChange = (technoName, value) => {

        this.setState(prevState => {
            let technologiesData = Object.assign({}, prevState.technologiesData)

            technologiesData[technoName] = value
            return { technologiesData }
        })
    }

    handleBrowserChange = (browserName, evTarget) => {
        this.setState({
            currentBrowser: browserName
        })
        let dataNumber = evTarget.dataset.number,
            value = evTarget.value;

        this.setState(prevState => {
            let browserData = Object.assign({}, prevState.browserData)
            browserData[dataNumber] = value
            return { browserData }
        })
    }

    render() {
        console.log(this.props)
        return (
            <div className={"input-form " + this.props.visibilityState}>
                {this.state.redirect ? <Redirect to='/' /> : null}

                <div className="go-back" onClick={this.returnToPreviousForm}>
                    <i className="fas fa-chevron-circle-left"></i>
                </div>

                <header className="setup-form-info">
                    <h2 className='step-description'>Input path your workspaces</h2>
                </header>

                <h3 className="step-helper">Input path workspaces</h3>
                <div className="input-section">
                    {
                        this.props.technologies.map((value, index) => {
                            let firstKey = Object.keys(value)[0];
                            let error = ""
                            if (firstKey === Object.keys(this.state.technoError)[0]) error = this.state.technoError

                            if (value[firstKey] === true) {
                                for (let i = 0; i < this.props.images.length; i++) {
                                    if (this.props.images[i].name === firstKey) {
                                        return <TechnologiesCard
                                            key={index}
                                            callback={this.handleInputChange}
                                            technoName={firstKey}
                                            image={this.props.images[i].img}
                                            technoError={error} />
                                    }
                                }
                            }
                        })
                    }

                    {
                        this.props.browser !== ""
                            ? <BrowserCard
                                callback={this.handleBrowserChange}
                                browserName={this.props.browser}
                                image={this.props.browserImage}
                                browserError={this.state.browserError} />
                            : null

                    }
                </div>
                <button onClick={this.handleSubmitWorkspace}>Submit</button>
            </div>
        )
    }
}

class TechnologiesCard extends React.Component {
    constructor(props) {
        super(props)
    }

    inputHandler = (event) => {
        this.props.callback(this.props.technoName, event.target.value)
    }

    render() {
        let key = null
        if (this.props.technoError !== "") key = Object.keys(this.props.technoError)[0]

        let technoInput = "";
        if (key !== null)
            technoInput = _helper.CLASSNAME_INVALID_INPUT

        return (
            <div className="card mb-3 border-left-0 border-right-0 border-top-0">
                <div className="row">

                    <div className="col-md-2">
                        <div className="card-wrapper">
                            <img src={this.props.image}
                                className="" alt="..." width="80px" height="80px" />
                            <h4 className="techno-name">{this.props.technoName}</h4>
                        </div>
                    </div>

                    <div className="col-md-8 techno-input-wrapper">
                        <div className="form-group">
                            <input name="path"
                                type="text"
                                className={"form-control " + technoInput}
                                id="pathInput"
                                placeholder="Input local path..."
                                onChange={this.inputHandler} />
                            {
                                key !== null
                                    ? <ErrorLabel text={this.props.technoError[key]} />
                                    : null
                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


class BrowserCard extends React.Component {
    constructor(props) {
        super(props)

        this.inputMap = _technoHelper.INPUTS_DATA_NUMBER
    }

    inputHandler = (event) => {
        this.props.callback(this.props.browserName, event.target)
    }

    render() {
        let errorObject = this.props.browserError[Object.keys(this.props.browserError)];
        let key = 0, errorMsg = ""
        if (errorObject === undefined) errorObject = null;
        else {
            key = Object.keys(errorObject)[0]
            errorMsg = errorObject[key]
        }
        return (
            <div className="card mb-3 border-left-0 border-right-0 border-top-0">
                <div className="row">
                    <div className="col-md-2 align-items-center d-flex flex-column justify-content-center">
                        <img src={this.props.image}
                            className="" alt="..." width="80px" height="80px" />
                        <h4 style={{ textAlign: "center", marginTop: "10px" }}>{this.props.browserName}</h4>
                    </div>

                    <div className="col-md-8 align-items-center justify-content-center">

                        {
                            this.inputMap.map((value, index) => {
                                let error = ""
                                if (errorObject !== null && key == value)
                                    error = _helper.CLASSNAME_INVALID_INPUT
                                return (
                                    <div className="form-group mb-3" key={index} >

                                        <input
                                            type="text"
                                            style={{ marginBottom: "0" }}
                                            className={"form-control browser-input " + error}
                                            placeholder="Input local path..."
                                            aria-label=""
                                            aria-describedby="basic-addon1"
                                            data-number={value}
                                            onChange={this.inputHandler} />
                                        {
                                            errorObject !== null && key == value
                                                ? <ErrorLabel text={errorMsg} />
                                                : null
                                        }
                                    </div>

                                )
                            })
                        }
                    </div>

                </div>
            </div>
        )
    }
}

function ErrorLabel(props) {
    return (
        <small id="emailHelp" className="form-text text-danger">{props.text}</small>
    )
}

export default InputForm;