const { _helper } = require('./authValidation');
const axios = require('axios');
axios.defaults.withCredentials = true;

const _serverHelper = {

    SERVER_USER_CREATED: "User create successful",
    SERVER_USER_ALREADY_IN_SYSTEM: "Already-registered",
    SERVER_USER_EXISTS: "Successesfull signin",
    SERVER_FIND_USER_SUCCESS: "User with this username exists",

    IP_ADRESS: "http://localhost:4000",

    PATH_ALREADY_REGISTERED: "/",
    PATH_USER_REGISTRATION: "/registration",
    PATH_USER_SIGHIN: "/auth",
    PATH_CREATE_WORKSPACE: "/createWorkspace",

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

    createNewWorkspace(componentContext, workspaseProps) {
        const helperContext = this;

        axios.post(helperContext.IP_ADRESS + helperContext.PATH_CREATE_WORKSPACE, {
            name: workspaseProps.name,
            categoy: workspaseProps.categoy,
            isActive: workspaseProps.activeCheck
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}

export { _serverHelper }