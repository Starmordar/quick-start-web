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

            selectedOption: _workspaceHelper.CHECKBOX_ACTIVE_WORKSPACE_MODE,
            showForm: "",
            invisible: true,

            currentCategoryInput: _workspaceHelper.CATEGORY_INPUT,
            optionState: _workspaceHelper.DEFAULT_OPTION
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCloseForm = this.handleCloseForm.bind(this);
        this.replaceInputsHandler = this.replaceInputsHandler.bind(this);
        this.handleCheckBoxOnChange = this.handleCheckBoxOnChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onChangeOptionHandler = this.onChangeOptionHandler.bind(this);
    }

    onChangeOptionHandler(event) {
        const targetValue = event.target.value;

        this.setState({ optionState: targetValue })
    }

    handleCloseForm() {
        this.props.callback(_workspaceHelper.USER_WANT_CLOSE_FORM);
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
            technologies: [],
            isActive: isActive,
            date: date
        }

        if (this.state.currentCategoryInput === _workspaceHelper.CATEGORY_OPTION) {
            workspaceSettings.category = this.state.optionState
        }

        const componentContext = this;
        if (_workspaceHelper.isValidWorkspaceProps(
            componentContext,
            this.state.currentCategoryInput)
        ) {

            _serverHelper.createNewWorkspace(componentContext, workspaceSettings)
                .then((responce) => {
                    if (responce === _serverHelper.SERVER_WORKSPACE_CREATED_SECCESSFUL) {
                        this.props.callback(_workspaceHelper.USER_ADDED_NEW_WORKSPACE);
                        this.props.callback(_workspaceHelper.USER_WANT_CLOSE_FORM);

                        _workspaceHelper.resetInputFields(componentContext)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })

        }
    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({
                invisible: false
            })
        }, 700)
    }

    replaceInputsHandler() {
        _workspaceHelper.replaceInputs(this)
    }

    render() {
        let showForm = this.props.visible
            ? _workspaceHelper.FORM_ENTERING_ANIMATION
            : _workspaceHelper.FORM_OUT_ANIMATION;

        let displayFrom = this.state.invisible
            ? _workspaceHelper.DISPLAY_NONE
            : _workspaceHelper.DISPLAY_BLOCK;

        let inputContent;
        if (this.state.currentCategoryInput === _workspaceHelper.CATEGORY_INPUT) {
            inputContent = <div className="form-group col-md-12" >
                <label htmlFor="categoryInput">Input Categoty</label>
                <div className="input-group mb-2">

                    <div className="input-group-prepend"
                        onClick={this.replaceInputsHandler}>
                        <div className="input-group-text">+</div>
                    </div>
                    <input name="category"
                        type="text"
                        className="form-control"
                        value={this.state.workspaceProps.category}
                        id="categoryInput"
                        placeholder="category"
                        onChange={this.handleChange} />
                </div>
                {
                    this.state.workspacePropsWarnings.category.isWarn ?
                        <ErrorLabel
                            text={this.state.workspacePropsWarnings.category.warnDescription} />
                        : null
                }
            </div>
        } else {
            inputContent = <div className="form-group col-12">
                <label htmlFor="inputState">choose exists</label>
                <div className="input-group mb-2">

                    <div className="input-group-prepend"
                        onClick={this.replaceInputsHandler}>
                        <div className="input-group-text">+</div>
                    </div>

                    <select id="inputState"
                        className="form-control"
                        value={this.optionsState}
                        onChange={this.onChangeOptionHandler}>
                        <option>School</option>
                        <option>University</option>
                        <option>Work</option>
                        <option>CustomWorkspaces</option>
                    </select>

                </div>
            </div>
        }

        return (
            <div className={"workspace-form-container " + showForm + " " + displayFrom}>

                <div className="close-form">
                    <i className="fa fa-window-close"
                        aria-hidden="true"
                        onClick={this.handleCloseForm}></i>
                </div>

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

                    <div className="form-row">
                        {inputContent}
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
