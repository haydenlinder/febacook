import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_USERS, REMOVE_USER, RECEIVE_USER } from "../actions/user_actions";

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            nextState[action.user.username] = action.user;
            return nextState
        case RECEIVE_USERS:
            return action.users;
        case RECEIVE_USER:
            nextState[action.user.username] = action.user;
        case REMOVE_USER:
            delete nextState[action.username];
            return nextState;
        default:
            return state;
    }
}

export default usersReducer;