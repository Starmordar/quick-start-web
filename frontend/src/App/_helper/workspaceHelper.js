const _workspaceHelper = {

    BLANK_INPUT_FIELD: "",
    CHECBOX_NAME: "activeCheck",

    CHECKBOX_ACTIVE_WORKSPACE_MODE: "active_mode",
    CHECKBOX_DISABLE_WORKSPACE_MODE: "disable_mode",

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

    isValidWorkspaceProps(componentContext) {
        this.resetErrorMessages(componentContext);

        if (this.isExistsBlankInputFields(componentContext)) return false;

        return true
    },

    isExistsBlankInputFields(componentContext) {
        for (const fieldName in componentContext.state.workspaceProps) {
            const inputField = componentContext.state.workspaceProps[fieldName];
            if (fieldName === this.CHECBOX_NAME) continue;

            if (inputField === this.BLANK_INPUT_FIELD) {
                const errorFieldName = fieldName,
                    warnDescription = fieldName + this.ERROR_BLANK_DESCRIPTION

                this.setErrorMessageOnInputField(
                    componentContext,
                    errorFieldName,
                    warnDescription
                )

                return true
            }
        }

        return false
    }
}

export { _workspaceHelper }