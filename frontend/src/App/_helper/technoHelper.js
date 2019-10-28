const _technoHelper = {

    BROWSER_CHROME: "Google Chrome",
    BROWSER_FIREFOX: "Firefox",
    BROWSER_SAFARI: "Safari",
    BROWSER_IE: "Internet Explorer",

    CLASSNAME_SELECTED_BROWSER: "selected",
    CLASSNAME_SELECTED_TECNOLOGY: "techno-selected",
    CLASSNAME_VISIBLE_FORM: "visible",
    CLASSNAME_ACTIVE_STEP: "active-step",

    CODE_VISUAL_STUDIO_CODE: "VSCode",
    CODE_ATOM: "Atom",
    CODE_SUBLIME_TEXT: "SublimeText",

    WARN_CHOOSE_SOMETHING: "Choose something",
    WARN_EMPTY_FIELD: "Path can't be empty",
    WARN_INVALID_URL: "URL should be valid string",

    ANIMATION_FADE_OUT: "animated bounceOutUp",
    ANIMATION_FADE_IN: "animated bounceInUp",
    ANIMATION_TIME_START_TO_END_MS: 800,

    ICON_NAME: "icon",

    INPUTS_DATA_NUMBER: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

    STEP_DESCRIPTION_CHOOSE_TECHNO: "CHOOSE TECHNOLOGIES",
    STEP_DESCRIPTION_ADD_LOCAL_PATH: "SETTING TECHNOLOGIES",

    REGEX_VALID_FOLDER_PATH: new RegExp(/^\/|(\/[a-zA-Z0-9_-]+)+$/),
    REGEX_VALID_BROWSER_URL: new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/),
    REGEX_VALID_LOCALHOST: new RegExp(/https?:\/\/localhost/),
    BLACK_COLOR: "black",

    setBrowserErrorMessage(componentContext, browser, errCauseElement, key) {
        componentContext.setState({
            browserError: { [browser]: { [key]: this.WARN_INVALID_URL } }
        })
    },

    isValidBrowserURLs(componentContext, browser, browserData) {
        if (browser === "") return true
        if (Object.entries(browserData).length === 0) {
            alert(this.WARN_EMPTY_FIELD)
            componentContext.setState({
                browserError: {}
            })
            return false;
        }

        let flag = false;
        for (const key in browserData) {
            if (browserData[key] !== "") flag = true
        }
        if (!flag) {
            alert(this.WARN_EMPTY_FIELD)
            componentContext.setState({
                browserError: {}
            })
            return false;
        }

        for (const key in browserData) {
            if (browserData[key] === "") continue;
            if (!this.REGEX_VALID_BROWSER_URL.test(browserData[key]) &&
                !this.REGEX_VALID_LOCALHOST.test(browserData[key])) {
                this.setBrowserErrorMessage(componentContext, browser, browserData[key], key)
                return false
            }
        }
        return true
    },

    isValidLinuxFolderValidation(componentContext, folders, props) {
        for (let i = 0; i < props.length; i++) {
            let key = Object.keys(props[i])[0];
            if (!this.REGEX_VALID_FOLDER_PATH.test(folders[key])) {
                console.log(12)
                return "lol"
            }
            // if (folders[key] === undefined && props[i][key] === true) return this.WARN_EMPTY_FIELD
        }
        return "dwejnk.dn,ew";
    }
}

export { _technoHelper }