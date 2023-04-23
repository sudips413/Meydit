import userReducer from "./userReducer";
import { combineReducers } from "redux";
import themeDarkReducer from "./themeDark";
import registrationStatusReducer from "./registration";


const rootReducer = combineReducers({
    userReducer,themeDarkReducer,registrationStatusReducer
});

export default rootReducer;