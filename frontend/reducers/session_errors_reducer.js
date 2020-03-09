import { RECEIVE_SESSION_ERRORS, CLEAR_SESSION_ERRORS } from "../actions/session_actions";

const sessionErrorsReducer = (state = {}, action) => {
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            nextState = Object.assign(nextState, action.errors)
            return nextState;
        case CLEAR_SESSION_ERRORS:
            for (let i = 0; i < action.errors.length; i++) {
                nextState[action.errors[i]] = null
            }
            return {}
        default:
            return state;
    } 
}

export default sessionErrorsReducer;