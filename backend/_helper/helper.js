const _helper = {

    USER_ALREADY_REGISTER: "Already-registered",
    USER_NOT_REGISTER_YET: "Not registered yet",

    WARNING_EMAIL_ALREADY_TAKEN: "Email already taken",
    WARNING_USER_WITH_PARTICULAR_USERNAME_EXISTS: "User with that nickname already exists",
    WARNING_USERNAME_WRONG: "User with this username doesn't exists",

    UNIQUE_VALUE: "unique user",
    USER_CREATED_SUCCESSFUL: "User create successful",
    SUCCESS_ASSIGN_GLOBAL: "Success assign global",

    PATH_IS_USER_ALREADY_IN_SYSTEM: "/",
    PATH_USER_REGISTRATION: "/registration",
    PATH_USER_SIGHIN: "/auth",
    PATH_CREATE_WORKSPACE: "/createWorkspace",
    PATH_LOAD_WORKSPACE: "/getWorkspaces",
    PATH_SIGNOUT: "/signout",
    PATH_GET_WORKSPACE: "/getSingleWorkspace",
    PATH_ADD_WORKSPACE: "/addWorkspace",
    PATH_GET_GLOBAL_WORKSPACE: "/getGlobalWorkspace",
    PATH_UPDATE_WORKSPACE: "/updateWorkspace",
    PATH_GET_WORKSPACES: "/getWorkspacesCurl",
    PATH_GET_USERNAME: "/getName",
    
    COOKIES_PROP: "connect.sid",

    FIND_USER_SUCCESS: "User with this username exists",
    FIND_USER_WRONG_USERNAME: "User with this username doesn't exists",
    FIND_PASSWORD_ERROR: "Error password",

    SERVER_WORKSPACE_CREATED_SECCESSFUL: "Workspace created successful",
    SERVER_USER_SUCCESSFUL_SIGNED_OUT: "User successful signed out",
    SERVER_WORKSPACE_UPDATED_SUCCESSFUL: "Workspace updated successful"
}

module.exports = {
    _helper: _helper
}