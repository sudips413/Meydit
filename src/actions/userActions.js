const login= (user) => {
    return {
        type: "LOGIN",
        payload: user,
    };
};
const logout = () => {
    return {
        type: "LOGOUT",
    };
};
const themeDark = () => {
    return {
        type: "DARK",
    };
};
const themeLight = () => {
    return {
        type: "LIGHT",
    };
};
const set_registration_status=(status)=>{
    return {
        type:"SET_REGISTRATION_STATUS",
        payload: status
    }
}
const userActions = {
    login,logout,themeDark,themeLight,set_registration_status
};


export default userActions;