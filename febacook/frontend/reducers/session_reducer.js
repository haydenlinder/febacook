import { 
    RECEIVE_CURRENT_USER, 
    RECEIVE_NULL_SESSION, 
} from "../actions/session_actions";

const sessionReducer = (state ={}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            nextState.id = action.user.id;
            return nextState;
        case RECEIVE_NULL_SESSION:
            nextState.id = null;
            return nextState;
        default:
            return state;
    }
}

export default sessionReducer;