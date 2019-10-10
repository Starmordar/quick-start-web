import React from 'react';
import { Redirect } from 'react-router-dom';
import './CreateWorkspaceForm.css';

const { _workspaceHelper } = require('../../_helper/workspaceHelper');
const { _serverHelper } = require('../../_helper/serverReponce');

class CreateWorkspaceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workspaceProps: {
                name: '',
                category: '',
                activeCheck: ''
            },
            workspacePropsWarnings: {
                name: { isWarn: false, warnDescription: "" },
                category: { isWarn: false, warnDescription: "" },
            },
            selectedOption: _workspaceHelper.CHECKBOX_ACTIVE_WORKSPACE_MODE
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBoxOnChange = this.handleCheckBoxOnChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    handleChange(event) {
        _workspaceHelper.updateValueInFormInput(this, event);
    }

    handleCheckBoxOnChange(event) {
        this.setState({ selectedOption: event.target.value })
    }

    onSubmitHandler(event) {
        event.preventDefault();

        let isActive = false;
        if (this.state.selectedOption === _workspaceHelper.CHECKBOX_ACTIVE_WORKSPACE_MODE) {
            isActive = true
        }

        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        let workspaceSettings = {
            name: this.state.workspaceProps.name,
            category: this.state.workspaceProps.category,
            isActive: isActive,
            date: date
        }

        const componentContext = this;
        if (_workspaceHelper.isValidWorkspaceProps(componentContext)) {

            _serverHelper.createNewWorkspace(componentContext, workspaceSettings)
            
        }
    }

    render() {
        return (
            <div className="workspace-form-container">
                <form onSubmit={this.onSubmitHandler}>

                    <div className="form-group">
                        <label htmlFor="workspaceNameInput">Workspace name</label>
                        <input name="name"
                            type="text"
                            className="form-control"
                            value={this.state.workspaceProps.name}
                            id="workspaceNameInput"
                            placeholder="Enter worspace name"
                            onChange={this.handleChange} />
                        {
                            this.state.workspacePropsWarnings.name.isWarn ?
                                <ErrorLabel
                                    text={this.state.workspacePropsWarnings.name.warnDescription} />
                                : null
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="categoryInput">Input Categoty</label>
                        <input name="category"
                            type="text"
                            className="form-control"
                            value={this.state.workspaceProps.category}
                            id="categoryInput"
                            placeholder="category"
                            onChange={this.handleChange} />
                        {
                            this.state.workspacePropsWarnings.category.isWarn ?
                                <ErrorLabel
                                    text={this.state.workspacePropsWarnings.category.warnDescription} />
                                : null
                        }
                    </div>

                    <div className="row justify-content-center">
                        <div className="form-check mr-2">
                            <input className="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios1"
                                value={_workspaceHelper.CHECKBOX_ACTIVE_WORKSPACE_MODE}
                                checked={this.state.selectedOption === _workspaceHelper.CHECKBOX_ACTIVE_WORKSPACE_MODE}
                                onChange={this.handleCheckBoxOnChange} />
                            <label className="form-check-label" htmlFor="exampleRadios1">Active mode</label>
                        </div>
                        <div className="form-check ml-2">
                            <input className="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios2"
                                value={_workspaceHelper.CHECKBOX_DISABLE_WORKSPACE_MODE}
                                checked={this.state.selectedOption === _workspaceHelper.CHECKBOX_DISABLE_WORKSPACE_MODE}
                                onChange={this.handleCheckBoxOnChange} />
                            <label className="form-check-label" htmlFor="exampleRadios2">Disables mode</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>
            </div>
        )
    }
}

function ErrorLabel(props) {
    return (
        <small id="emailHelp" className="form-text text-muted">{props.text}</small>
    )
}

export default CreateWorkspaceForm;
