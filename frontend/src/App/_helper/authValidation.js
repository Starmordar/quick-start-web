const _helper = {

    NO_ERROR_STRING: "",
    BLANK_INPUT_FIELD: "",
    ERROR_FIELD_NAME_ENDING: "Err",
    ERROR_BLANK_DESCRIPTION: " can't be blank",

    CLASSNAME_INVALID_INPUT: "is-invalid",
    CLASSNAME_VALID_INPUT: "is-valid",

    PATH_HOME_PAGE: "/",
    PATH_AUTH_PAGE: "/auth",
    PATH_REGISTRATION_PAGE: "/registration",

    EMAIL_VALIDATION_REGEX: new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
    ONLY_LETTER_NUMBER_UNDERSCOPES_REGEX: new RegExp(/\W/),
    AT_LEAST_ONE_NUMBER_REGEX: new RegExp(/[0-9]/),
    AT_LEAST_ONE_LOWER_CASE_REGEX: new RegExp(/[a-z]/),
    AT_LEAST_ONE_UPPER_CASE_REGEX: new RegExp(/[A-Z]/),

    ERROR_EMAIL_FIELD_NAME: "emailErr",
    ERROR_CONFIRM_PASSWORD_FIELD_NAME: "confirmPasswordErr",
    ERROR_USERNAME_FIELD_NAME: "usernameErr",
    ERROR_PASSWORD_FIELD_NAME: "passwordErr",

    ERROR_INVALID_EMAIL_DESCRIPTION: "Email is invalid",

    ERROR_NOT_MATCH_PASSWORDS_DESCRIPTION: "Does not match passwords",

    ERROR_USERNAME_ALPHABET: "The username can contains only letters, numbers, and underscores",
    ERROR_USERNAME_LENGTH: "The username length must be between 6 - 30 characters",

    ERROR_PASSWORD_ALPHABET: "The password can contains only letters, numbers, and underscores",
    ERROR_PASSWORD_LENGTH: "The password should contains 8 - 30 characters",
    ERROR_PASSWORD_DIFFERENCE_FROM_USERNAME: "Password must be different from Username!",
    ERROR_PASSWORD_AT_LEAST_ONE_NUMBER: "Password must contain at least one number",
    ERROR_PASSWORD_AT_LEAST_ONE_UPPER_CASE: "Password must contain at least one uppercase letter",
    ERROR_PASSWORD_AT_LEAST_ONE_LOWERCASE: "Password must contain at least one lowercase letter",

    ERROR_EMAIL_ALREADY_TAKEN: "Email already taken",
    ERROR_USERNAME_TAKEN: "User with that nickname already exists",

    MIN_USERNAME_LENGTH: 6,
    MAX_USERNAME_LENGHT: 30,
    MIN_PASSWORD_LENGTH: 8,
    MAX_PASSWORD_LENGHT: 30,

    FIND_USER_WRONG_USERNAME: "User with this username doesn't exists",
    FIND_PASSWORD_ERROR: "Error password",

    LOADER_TIME_FADE_OUT_MS: 500, 

    updateValueInFormInput(componentContext, event) {
        const targetName = event.target.name,
            targetValue = event.target.value

        componentContext.setState(prevState => {
            let newState = Object.assign({}, prevState);

            newState.userData[targetName] = targetValue

            return { newState }
        });
    },

    resetErrorMessages(componentContext) {
        componentContext.setState(prevState => {
            let newState = Object.assign({}, prevState);

            for (const key in newState.userDataErr) {
                newState.userDataErr[key] = {
                    isErr: false, errDescription: this.NO_ERROR_STRING
                }
            }
        });
    },

    setErrorMessageOnInputField(componentContext, errorFieldName, errorDescription) {
        componentContext.setState(prevState => {
            let newState = Object.assign({}, prevState);

            newState.userDataErr[errorFieldName] = {
                isErr: true,
                errDescription: errorDescription
            }

            return { newState }
        })
    },

    isExistsBlankInputFields(componentContext) {
        for (const fieldName in componentContext.state.userData) {
            const inputField = componentContext.state.userData[fieldName];

            if (inputField === this.BLANK_INPUT_FIELD) {
                const errorFieldName = fieldName + this.ERROR_FIELD_NAME_ENDING,
                    errDescription = fieldName.charAt(0).toUpperCase()
                        + fieldName.slice(1)
                        + this.ERROR_BLANK_DESCRIPTION

                this.setErrorMessageOnInputField(
                    componentContext,
                    errorFieldName,
                    errDescription
                )

                return true
            }
        }
    },

    isValidEmail(componentContext) {
        const email = componentContext.state.userData.email;
        if (email === undefined) return true;

        if (!this.EMAIL_VALIDATION_REGEX.test(email)) {

            this.setErrorMessageOnInputField(
                componentContext,
                this.ERROR_EMAIL_FIELD_NAME,
                this.ERROR_INVALID_EMAIL_DESCRIPTION
            )

            return false
        }

        return true
    },

    isEqualsPasswords(componentContext) {
        const userData = componentContext.state.userData;
        if (userData.confirmPassword === undefined) return true;

        if (userData.password !== userData.confirmPassword) {

            this.setErrorMessageOnInputField(
                componentContext,
                this.ERROR_CONFIRM_PASSWORD_FIELD_NAME,
                this.ERROR_NOT_MATCH_PASSWORDS_DESCRIPTION
            )

            return false
        }

        return true
    },

    isValidUsername(componentContext) {
        const username = componentContext.state.userData.username;

        if (this.ONLY_LETTER_NUMBER_UNDERSCOPES_REGEX.test(username)) {

            this.setErrorMessageOnInputField(
                componentContext,
                this.ERROR_USERNAME_FIELD_NAME,
                this.ERROR_USERNAME_ALPHABET
            )

            return false
        }

        if (username.length < this.MIN_USERNAME_LENGTH ||
            username.length > this.MAX_USERNAME_LENGHT) {

            this.setErrorMessageOnInputField(
                componentContext,
                this.ERROR_USERNAME_FIELD_NAME,
                this.ERROR_USERNAME_LENGTH
            )

            return false
        }

        return true
    },

    isValidPassword(componentContext) {
        const password = componentContext.state.userData.password;

        if (this.ONLY_LETTER_NUMBER_UNDERSCOPES_REGEX.test(password)) {

            this.setErrorMessageOnInputField(
                componentContext,
                this.ERROR_PASSWORD_FIELD_NAME,
                this.ERROR_PASSWORD_ALPHABET
            )

            return false
        }

        if (password.length < this.MIN_PASSWORD_LENGTH
            || password.length > this.MAX_PASSWORD_LENGHT) {

            this.setErrorMessageOnInputField(
                componentContext,
                this.ERROR_PASSWORD_FIELD_NAME,
                this.ERROR_PASSWORD_LENGTH
            )

            return false
        }

        if (password === componentContext.state.userData.username) {

            this.setErrorMessageOnInputField(
                componentContext,
                this.ERROR_PASSWORD_FIELD_NAME,
                this.ERROR_PASSWORD_DIFFERENCE_FROM_USERNAME
            )

            return false
        }

        if (!this.AT_LEAST_ONE_NUMBER_REGEX.test(password)) {

            this.setErrorMessageOnInputField(
                componentContext,
                this.ERROR_PASSWORD_FIELD_NAME,
                this.ERROR_PASSWORD_AT_LEAST_ONE_NUMBER
            )

            return false
        }

        if (!this.AT_LEAST_ONE_LOWER_CASE_REGEX.test(password)) {

            this.setErrorMessageOnInputField(
                componentContext,
                this.ERROR_PASSWORD_FIELD_NAME,
                this.ERROR_PASSWORD_AT_LEAST_ONE_LOWERCASE
            )

            return false
        }

        if (!this.AT_LEAST_ONE_UPPER_CASE_REGEX.test(password)) {

            this.setErrorMessageOnInputField(
                componentContext,
                this.ERROR_PASSWORD_FIELD_NAME,
                this.ERROR_PASSWORD_AT_LEAST_ONE_UPPER_CASE
            )

            return false
        }

        return true
    },

    isValidUserData(componentContext) {
        this.resetErrorMessages(componentContext);

        if (this.isExistsBlankInputFields(componentContext)) return false;

        if (!this.isValidEmail(componentContext)) return false;

        if (!this.isValidPassword(componentContext)) return false;

        if (!this.isEqualsPasswords(componentContext)) return false;

        if (!this.isValidUsername(componentContext)) return false;

        return true;
    },

    handleServerErrorMessages(componentContext, serverResponce) {
        this.resetErrorMessages(componentContext);

        if (serverResponce === this.ERROR_EMAIL_ALREADY_TAKEN) {
            this.setErrorMessageOnInputField(
                componentContext,
                this.ERROR_EMAIL_FIELD_NAME,
                this.ERROR_EMAIL_ALREADY_TAKEN
            )
        }
        if (serverResponce === this.ERROR_USERNAME_TAKEN) {
            this.setErrorMessageOnInputField(
                componentContext,
                this.ERROR_USERNAME_FIELD_NAME,
                this.ERROR_USERNAME_TAKEN
            )
        }
        if (serverResponce === this.FIND_USER_WRONG_USERNAME) {
            this.setErrorMessageOnInputField(
                componentContext,
                this.ERROR_USERNAME_FIELD_NAME,
                this.FIND_USER_WRONG_USERNAME
            )
        }
        if (serverResponce === this.FIND_PASSWORD_ERROR) {
            this.setErrorMessageOnInputField(
                componentContext,
                this.ERROR_PASSWORD_FIELD_NAME,
                this.FIND_PASSWORD_ERROR
            )
        }
    }
}

export { _helper }
