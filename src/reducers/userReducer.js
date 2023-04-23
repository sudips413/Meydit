const initialState = {
    currentUser:{
        id: '',
        username:'',
        email:'',
        role:'',
        orders: '',
        loginStatus: false
    }
};

function userReducer(state = initialState, action){
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                currentUser:{
                    id: action.payload.id,
                    username: action.payload.username,
                    email: action.payload.email,
                    role: action.payload.role,
                    orders: action.payload.orders,
                    loginStatus: true
                }
            }
        case 'LOGOUT':
            return {
                ...state,
                currentUser:{
                    id: '',
                    username: '',
                    email: '',
                    role: '',
                    loginStatus: false
                }
            }    
        default:
            return state;
    }
}

export default userReducer;