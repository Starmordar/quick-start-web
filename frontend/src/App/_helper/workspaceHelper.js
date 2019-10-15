const { _helper } = require('./authValidation');

const _workspaceHelper = {

    BLANK_INPUT_FIELD: "",
    CHECBOX_NAME: "activeCheck",

    CHECKBOX_ACTIVE_WORKSPACE_MODE: "active_mode",
    CHECKBOX_DISABLE_WORKSPACE_MODE: "disable_mode",

    VISIBLE_CLASSNAME: "visible",
    HIDDEN_CLASSNAME: "hidden",

    FORM_ENTERING_ANIMATION: "animated bounceInUp",
    FORM_OUT_ANIMATION: "animated bounceOutUp",

    OVERPLAY_FADEIN_ANIMATION: "animated fadeIn",
    OVERPLAY_FADEOUT_ANIMATION: "animated fadeOut",

    Z_INDEX_IN: "clickable",
    Z_INDEX_OUT: "not-clickable",

    DISPLAY_BLOCK: "display-block",
    DISPLAY_NONE: "display-none",

    USER_WANT_CLOSE_FORM: "close form",
    USER_ADDED_NEW_WORKSPACE: "added workspace",

    CATEGORY_OPTION: "option",
    CATEGORY_INPUT: "input",

    WORKSPACE_PROP_NAME: "Name",
    WORKSPACE_PROP_CATEGORY: "Category",
    WORKSPACE_PROP_STATUS: "Status",
    WORKSPACE_PROP_DATE: "Added",
    WORKSPACE_PROP_TECHNOLOGIES: "Technologies",
    WORKSPACE_PROP_COUNT: "Total usage",

    DISABLED_WORKSPACE: "Disable",
    ACTIVE_WORKSPACE: "Active",

    NAME_FIELD: "name",
    DEFAULT_OPTION: "School",

    ARROW_UP: "up",
    ARROW_DOWN: "down",

    LIST_TAG_NAME: "LI",
    ACHNOR_TAG_NAME: "A",

    STATUS_FILTER_NAME: "Workspace status",
    DEFAULT_FILTER_RULES: "All",
    STATUS_FILTER_OPTION_1: "Active",
    STATUS_FILTER_OPTION_2: "Disable",

    updateValueInFormInput(componentContext, event) {
        const targetName = event.target.name,
            targetValue = event.target.value

        componentContext.setState(prevState => {
            let newState = Object.assign({}, prevState);

            newState.workspaceProps[targetName] = targetValue

            return { newState }
        });
    },

    resetErrorMessages(componentContext) {
        componentContext.setState(prevState => {
            let newState = Object.assign({}, prevState);

            for (const key in newState.workspacePropsWarnings) {
                newState.workspacePropsWarnings[key] = {
                    isWarn: false, warnDescription: this.NO_ERROR_STRING
                }
            }
        });
    },

    setErrorMessageOnInputField(componentContext, errorFieldName, errorDescription) {
        componentContext.setState(prevState => {
            let newState = Object.assign({}, prevState);

            newState.workspacePropsWarnings[errorFieldName] = {
                isWarn: true,
                warnDescription: errorDescription
            }

            return { newState }
        })
    },

    isValidWorkspaceProps(componentContext, validType) {
        this.resetErrorMessages(componentContext);

        if (validType === this.CATEGORY_OPTION) {
            if (componentContext.state.workspaceProps.name === this.BLANK_INPUT_FIELD) {
                const errorFieldName = this.NAME_FIELD,
                    warnDescription = this.NAME_FIELD + _helper.ERROR_BLANK_DESCRIPTION

                this.setErrorMessageOnInputField(
                    componentContext,
                    errorFieldName,
                    warnDescription
                )
                return false;
            }
            return true;
        }
        if (this.isExistsBlankInputFields(componentContext)) return false;

        return true
    },

    isExistsBlankInputFields(componentContext) {
        for (const fieldName in componentContext.state.workspaceProps) {
            const inputField = componentContext.state.workspaceProps[fieldName];
            if (fieldName === this.CHECBOX_NAME) continue;

            if (inputField === this.BLANK_INPUT_FIELD) {
                const errorFieldName = fieldName,
                    warnDescription = fieldName + _helper.ERROR_BLANK_DESCRIPTION

                this.setErrorMessageOnInputField(
                    componentContext,
                    errorFieldName,
                    warnDescription
                )

                return true
            }
        }

        return false
    },

    resetInputFields(componentContext) {
        componentContext.setState(prevState => {
            let newState = Object.assign({}, prevState);

            for (const key in newState.workspaceProps) {
                newState.workspaceProps[key] = this.BLANK_INPUT_FIELD
            }
        });

        componentContext.setState({
            selectedOption: _workspaceHelper.CHECKBOX_ACTIVE_WORKSPACE_MODE
        })
    },

    replaceInputs(componentContext) {
        if (componentContext.state.currentCategoryInput === this.CATEGORY_OPTION) {
            componentContext.setState({
                currentCategoryInput: this.CATEGORY_INPUT
            })
        } else {
            componentContext.setState({
                currentCategoryInput: this.CATEGORY_OPTION
            })
        }


    },

    filterHandler(componentContext) {
        
    }
}

export { _workspaceHelper }