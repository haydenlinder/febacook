import { 
    RECEIVE_CURRENT_USER, 
    RECEIVE_NULL_SESSION, 
} from "../actions/session_actions";

const sessionReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            nextState.username = action.user.username;
            return nextState;
        case RECEIVE_NULL_SESSION:
            nextState.username = null;
            return nextState;
        default:
            return state;
    }
}

export default sessionReducer;