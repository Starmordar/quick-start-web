import React from 'react';
import { Redirect } from 'react-router-dom';
import './InputForm.css';

import { _technoHelper } from '../../../_helper/technoHelper';
import { _serverHelper } from '../../../_helper/serverReponce';

class InputForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            technologiesData: {},
            browserData: {},
            currentBrowser: "",

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
        
        _serverHelper.updateExistingWorkspace(dataToUpdate)
            .then((responce) => {
                if(responce === _serverHelper.SERVER_WORKSPACE_UPDATED_SUCCESSFUL){
                    this.setState({
                        redirect: !this.state.redirect
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
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
        return (
            <div className={"input-form " + this.props.visibilityState}>
                {this.state.redirect ? <Redirect to='/' /> : null}
                <button onClick={this.returnToPreviousForm}></button>
                <header className="setup-form-info">
                    <h2 className='step-description'>Select path your workspace</h2>
                    <h3 className="step-helper">Input path your workspaces</h3>
                </header>

                <div className="input-section">
                    {
                        this.props.technologies.map((value, index) => {
                            let firstKey = Object.keys(value)[0];
                            if (value[firstKey] === true) {
                                return <TechnologiesCard
                                    key={index}
                                    callback={this.handleInputChange}
                                    technoName={firstKey} />
                            }
                        })
                    }

                    {
                        this.props.browser !== ""
                            ? <BrowserCard
                                callback={this.handleBrowserChange}
                                browserName={this.props.browser} />
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
        return (
            <div className="card mb-3 border-left-0 border-right-0 border-top-0">
                <div className="row">
                    <div className="col-md-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"
                            className="card-img" alt="..." width="80px" height="80px" />
                        <h4>{this.props.technoName}</h4>
                    </div>

                    <div className="col-md-8 align-items-center justify-content-center">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                            </div>
                            <input type="text"
                                className="form-control"
                                placeholder="Input local path..."
                                aria-label=""
                                aria-describedby="basic-addon1"
                                onChange={this.inputHandler} />
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
        return (
            <div className="card mb-3 border-left-0 border-right-0 border-top-0">
                <div className="row">
                    <div className="col-md-3 align-items-center d-flex flex-column justify-content-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"
                            className="card-img" alt="..." width="80px" height="80px" />
                        <h4>{this.props.browserName}</h4>
                    </div>

                    <div className="col-md-9 align-items-center justify-content-center">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                            </div>
                        </div>
                        {
                            this.inputMap.map((value, index) => {
                                return <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Input local path..."
                                    aria-label=""
                                    aria-describedby="basic-addon1"
                                    key={index}
                                    data-number={value}
                                    onChange={this.inputHandler} />
                            })
                        }

                    </div>

                </div>
            </div>
        )
    }
}

export default InputForm;