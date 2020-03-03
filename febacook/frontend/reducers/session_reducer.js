import { 
    RECEIVE_CURRENT_USER, 
    RECEIVE_NULL_SESSION, 
    RECEIVE_SESSION_ERRORS 
} from "../actions/session_actions";

const sessionReducer = (state ={}, action) => {
    Object.freeze(state);
    let nextSatate = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            nextSatate[action.user.id]
            
        default:
            break;
    }
}