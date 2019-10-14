const { _helper } = require('./authValidation');
const axios = require('axios');
axios.defaults.withCredentials = true;

const _serverHelper = {

    SERVER_USER_CREATED: "User create successful",
    SERVER_USER_ALREADY_IN_SYSTEM: "Already-registered",
    SERVER_USER_EXISTS: "Successesfull signin",
    SERVER_FIND_USER_SUCCESS: "User with this username exists",
    SERVER_WORKSPACE_CREATED_SECCESSFUL: "Workspace created successful",
    SERVER_USER_SUCCESSFUL_SIGNED_OUT: "User successful signed out",

    IP_ADRESS: "http://localhost:4000",

    PATH_ALREADY_REGISTERED: "/",
    PATH_USER_REGISTRATION: "/registration",
    PATH_USER_SIGHIN: "/auth",
    PATH_CREATE_WORKSPACE: "/createWorkspace",
    PATH_LOAD_WORKSPACE: "/getWorkspaces",
    PATH_SIGNOUT: "/signout",

    redirectToHomeIfUserAlreadyOnTheSystem(componentContext) {
        const helperContext = this;

        axios.get(helperContext.IP_ADRESS + helperContext.PATH_ALREADY_REGISTERED)
            .then(function (response) {

                if (response.data === helperContext.SERVER_USER_ALREADY_IN_SYSTEM) {
                    componentContext.setState({ redirect: true })
                }
            }).catch(function (error) {
                console.log(error);
            });
    },

    userRegistration(componentContext, userData) {
        const helperContext = this;

        axios.get(helperContext.IP_ADRESS + helperContext.PATH_USER_REGISTRATION, {
            params: {
                username: userData.username,
                email: userData.email,
                password: userData.password
            }
        }).then(function (response) {
            _helper.handleServerErrorMessages(componentContext, response.data);

            if (response.data === _serverHelper.SERVER_USER_CREATED) {
                componentContext.setState({ redirect: true })
            }

        }).catch(function (error) {
            console.log(error);
        });
    },

    userSignIn(componentContext, userData) {
        const helperContext = this;

        axios.get(helperContext.IP_ADRESS + helperContext.PATH_USER_SIGHIN, {
            params: {
                username: userData.username,
                password: userData.password
            }
        }).then(function (response) {
            _helper.handleServerErrorMessages(componentContext, response.data);

            if (response.data === _serverHelper.SERVER_USER_EXISTS) {
                componentContext.setState({ redirect: true })
            }
            if (response.data === _serverHelper.SERVER_FIND_USER_SUCCESS) {
                componentContext.setState({ redirect: true })
            }
        }).catch(function (error) {
            console.log(error);
        });
    },

    signOut(componentContext) {
        const helperContext = this;
        axios.get(helperContext.IP_ADRESS + helperContext.PATH_SIGNOUT
        ).then(function (response) {
            if (response.data === helperContext.SERVER_USER_SUCCESSFUL_SIGNED_OUT) {
                componentContext.setState({
                    redirect: true
                })
            }
        }).catch(function (error) {
            console.log(error);
        });
    },

    createNewWorkspace(componentContext, workspaseProps) {
        const helperContext = this;

        return new Promise(function (resolve, reject) {
            axios.post(helperContext.IP_ADRESS + helperContext.PATH_CREATE_WORKSPACE, workspaseProps)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject(error);
                });
        })
    },

    getWorkspaces() {
        const helperContext = this;

        return new Promise(function (resolve, reject) {
            axios.get(helperContext.IP_ADRESS + helperContext.PATH_LOAD_WORKSPACE)
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (error) {
                    reject(error)
                });
        })
    }
}

export { _serverHelper }