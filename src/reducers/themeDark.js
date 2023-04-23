const initialState = {
    darkMode: false
};

function themeDarkReducer(state = initialState, action){
    switch(action.type){
        case 'DARK':
            return {
                ...state,
                darkMode: true
            }
        case 'LIGHT':
            return {
                ...state,
                darkMode: false
            }    
        default:
            return state;
    }
}

export default themeDarkReducer;