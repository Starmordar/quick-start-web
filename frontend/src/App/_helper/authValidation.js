const _helper = {

    resetErrMsg(context) {
        context.setState({
            userDataErr: {
                usernameErr: { isErr: false, errDescription: '' },
                emailErr: { isErr: false, errDescription: '' },
                passwordErr: { isErr: false, errDescription: '' },
                confirmPasswordErr: { isErr: false, errDescription: '' }
            }
        });
    },

    setErrMsg(context, errorFieldName, errorDescription) {
        context.setState(prevState => {
            let data = Object.assign({}, prevState);

            data.userDataErr[errorFieldName] = {
                isErr: true,
                errDescription: errorDescription
            }

            return { data }
        })
    },

    isEmptyFields(context) {
        for (const key in context.state.userData) {
            const element = context.state.userData[key];

            if (element === "") {
                let errStr = `${key}Err`,
                    errDecription = `${key} cannot be blank`

                this.setErrMsg(context, errStr, errDecription)

                return true
            }
        }
    },

    isValidEmail(context) {
        const validEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        const email = context.state.userData.email;
        const errorFieldName = 'emailErr',
            errDecription = 'Email is invalid';

        if (!validEmail.test(email)) {
            this.setErrMsg(context, errorFieldName, errDecription)

            return false
        }

        return true
    },

    isEqualsPassword(context) {
        const userData = context.state.userData,
            errDecription = "does not match password",
            errFieldName = "confirmPasswordErr";

        if (userData.password !== userData.confirmPassword) {
            this.setErrMsg(context, errFieldName, errDecription)

            return false
        }

        return true
    },

    isValidUsername(context) {
        const illegalChars = new RegExp(/\W/);
        const username = context.state.userData.username;

        let errDecription = "",
            errFieldName = "usernameErr";

        if (illegalChars.test(username)) {
            errDecription = "The username can contains only letters, numbers, and underscores";
            this.setErrMsg(context, errFieldName, errDecription);

            return false;
        }

        if (username.length <= 5 || username.length >= 30) {
            errDecription = "The username can contains 5 - 30 characters";
            this.setErrMsg(context, errFieldName, errDecription);

            return false;
        }

        return true
    },

    isValidPassword(context) {
        const illegalChars = new RegExp(/\W/);
        const atLeastOneNumber = new RegExp(/[0-9]/);
        const atLeastOneLowerCase = new RegExp(/[a-z]/);
        const atLeastOneUpperCase = new RegExp(/[A-Z]/);
        const password = context.state.userData.password;

        let errDecription = "",
            errFieldName = "passwordErr";

        if (illegalChars.test(password)) {
            errDecription = "The password can contains only letters, numbers, and underscores";
            this.setErrMsg(context, errFieldName, errDecription);

            return false;
        }

        if (password.length <= 5 || password.length >= 30) {
            errDecription = "The password should contains 5 - 30 characters";
            this.setErrMsg(context, errFieldName, errDecription);

            return false;
        }

        if (password === context.state.userData.username) {
            errDecription = "Password must be different from Username!";
            this.setErrMsg(context, errFieldName, errDecription);

            return false;
        }

        if (!atLeastOneNumber.test(password)) {
            errDecription = "Password must contain at least one number";
            this.setErrMsg(context, errFieldName, errDecription);

            return false;
        }

        if (!atLeastOneLowerCase.test(password)) {
            errDecription = "Password must contain at least one lowercase letter (a-z)!";
            this.setErrMsg(context, errFieldName, errDecription);

            return false;
        }

        if (!atLeastOneUpperCase.test(password)) {
            errDecription = "Password must contain at least one uppercase letter (a-z)!";
            this.setErrMsg(context, errFieldName, errDecription);

            return false;
        }

        return true
    }
}

export { _helper }
