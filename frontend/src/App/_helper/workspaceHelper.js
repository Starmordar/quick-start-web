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
    CATEGORY_FIELD: "category",
    DEFAULT_OPTION: "School",

    ARROW_UP: "up",
    ARROW_DOWN: "down",

    LIST_TAG_NAME: "LI",
    ACHNOR_TAG_NAME: "A",

    STATUS_FILTER_NAME: "Workspace status",
    DEFAULT_FILTER_RULES: "All",
    STATUS_FILTER_OPTION_1: "Active",
    STATUS_FILTER_OPTION_2: "Disable",

    CATEGORY_FILTER_NAME: "Category",

    SORT_FILTER_NAME: "Sort by",
    DEFAULT_SORT_RULES: "All",
    NEWEST_DATE_SORT: "Newest workspaces",
    OLDEST_DATE_SORT: "Oldest workspaces",
    LOW_USAGE_SORT: "Lowest usage",
    HIGH_USAGE_SORT: "High usage",
    BY_CATEGORY: "Category sort",

    ENTER_CODE: "13",
    FIND_BY_PARAMS: "User search",

    WARN_USER_UNIQUE: "User should be unique",
    WARN_WORKSPACE_UNIQUE: "Workspace name should be unique",
    WARN_WORKSPACE_NAME: "Workspace name can't be \"All\"",

    DEFAULT_CATEGORIES: ["School", "University", "Work", "Custum workspaces"],

    MIN_SETTIMEOUT_TIME: 10,

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
                    warnDescription = this.NAME_FIELD.charAt(0).toUpperCase()
                        + this.NAME_FIELD.slice(1)
                        + this.ERROR_BLANK_DESCRIPTION

                this.setErrorMessageOnInputField(
                    componentContext,
                    errorFieldName,
                    warnDescription
                )
                return false;
            }
        }
        
        if (this.isExistsBlankInputFields(componentContext)) return false;
        if (this.nameValidation(componentContext)) return false;
        if (this.categoryValidation(componentContext, validType)) return false;
        return true
    },

    categoryValidation(componentContext, validType) {
        if (validType === this.CATEGORY_INPUT) {
            if (componentContext.state.workspaceProps.category === this.DEFAULT_FILTER_RULES) {
                this.setErrorMessageOnInputField(
                    componentContext,
                    this.CATEGORY_FIELD,
                    this.WARN_WORKSPACE_NAME
                )
                return true
            }
        } else { return false }
    },

    nameValidation(componentContext) {
        const temp = [...componentContext.props.workSpaceData]

        for (let i = 0; i < temp.length; i++) {

            if (temp[i].name === componentContext.state.workspaceProps.name) {

                this.setErrorMessageOnInputField(
                    componentContext,
                    this.NAME_FIELD,
                    this.WARN_WORKSPACE_UNIQUE
                )
                return true
            }
        }
        return false;
    },

    isExistsBlankInputFields(componentContext) {
        for (const fieldName in componentContext.state.workspaceProps) {
            const inputField = componentContext.state.workspaceProps[fieldName];

            if (fieldName === this.CHECBOX_NAME) continue;

            if (componentContext.state.currentCategoryInput === this.CATEGORY_OPTION
                && fieldName === this.CATEGORY_FIELD) continue;

            if (inputField === this.BLANK_INPUT_FIELD) {
                const errorFieldName = fieldName,
                    warnDescription = fieldName.charAt(0).toUpperCase()
                        + fieldName.slice(1)
                        + _helper.ERROR_BLANK_DESCRIPTION

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

    calculateDate(string) {
        const dateArr = string.split('-'),
            year = dateArr[0].split(" ")[1],
            month = dateArr[1],
            day = dateArr[2];

        return new Date(year + "/" + month + "/" + day)
    },

    applyFilterParams(componentContext, workspaces) {
        let temp = [...workspaces]

        temp = this.filterByStatus(componentContext, temp)

        temp = this.filterByCategory(componentContext, temp)

        temp = this.sortHandler(componentContext, temp)

        return temp
    },

    filterByStatus(componentContext, workspaces) {
        let temp = [...workspaces]

        switch (componentContext.state.statusRules) {
            case _workspaceHelper.DEFAULT_FILTER_RULES:
                break;

            case _workspaceHelper.STATUS_FILTER_OPTION_1:
                temp = temp.filter((workspace) => {
                    return workspace.isActive
                })
                break;

            case _workspaceHelper.STATUS_FILTER_OPTION_2:
                temp = temp.filter((workspace) => {
                    return !workspace.isActive
                })
                break;

            default:
                break;
        }

        return temp
    },

    filterByCategory(componentContext, workspaces) {
        let temp = [...workspaces];

        if (componentContext.state.categoryRules === _workspaceHelper.DEFAULT_FILTER_RULES) {
            return temp

        } else {
            temp = temp.filter((workspace) => {
                return workspace.category === componentContext.state.categoryRules
            })
        }

        return temp
    },

    sortHandler(componentContext, workspaces) {
        let temp = [...workspaces];
        if (componentContext.state.sortRules === _workspaceHelper.DEFAULT_SORT_RULES) {
            return temp
        }
        switch (componentContext.state.sortRules) {
            case _workspaceHelper.DEFAULT_SORT_RULES:
                break;

            case _workspaceHelper.NEWEST_DATE_SORT:
                temp.sort((workspace1, workspace2) => {
                    let date1 = this.calculateDate(workspace1.dateString)
                    let date2 = this.calculateDate(workspace2.dateString)

                    if (date1.getTime() < date2.getTime()) return 1
                    return -1
                })
                break;

            case _workspaceHelper.OLDEST_DATE_SORT:
                temp.sort((workspace1, workspace2) => {
                    let date1 = this.calculateDate(workspace1.dateString)
                    let date2 = this.calculateDate(workspace2.dateString)

                    if (date1.getTime() > date2.getTime()) return 1
                    return -1
                })

                break;

            case _workspaceHelper.LOW_USAGE_SORT:
                temp.sort((workspace1, workspace2) => {
                    return workspace1.count - workspace2.count
                })
                break;

            case _workspaceHelper.HIGH_USAGE_SORT:
                temp.sort((workspace1, workspace2) => {
                    
                    return workspace2.count - workspace1.count
                })
                break;

            case _workspaceHelper.BY_CATEGORY:
                temp.sort((workspace1, workspace2) => {
                    if (workspace1.category < workspace2.category) return -1
                    return 1
                })
                break;
            default:
                break;
        }
        return temp
    },

    resetFiltersParameters(componentContext) {
        componentContext.setState({
            statusRules: _workspaceHelper.DEFAULT_FILTER_RULES,
            categoryRules: _workspaceHelper.DEFAULT_FILTER_RULES,
            sortRules: _workspaceHelper.DEFAULT_SORT_RULES
        })
    },
}
export { _workspaceHelper }