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
                    errDecription = `${key} field can't be empty`

                this.setErrMsg(context, errStr, errDecription)

                return true;
            }
        }
    },

    isValidEmail(context) {
        const validEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

        if (!validEmail.test(context.state.userData.email)) {
            const errorFieldName = 'emailErr',
                errDecription = 'Email is invalid';

            this.setErrMsg(context, errorFieldName, errDecription)

            return false
        }

        return true
    }
}

export { _helper }
