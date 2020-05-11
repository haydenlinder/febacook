import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_USERS, REMOVE_USER, RECEIVE_USER } from "../actions/user_actions";

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            let users = Object.values(action.users)
            for (let i = 0; i < users.length; i++) {
                nextState[users[i].username] = users[i]
            }
            return nextState;
        case RECEIVE_USERS:
            if (action.users) {
                let users = Object.values(action.users)
                for (let i = 0; i < users.length; i++) {
                    nextState[users[i].username] = users[i]
                }
            }
            return nextState;
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