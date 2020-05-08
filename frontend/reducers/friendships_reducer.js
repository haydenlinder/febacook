import { RECEIVE_USER, RECEIVE_USERS } from "../actions/user_actions";
import { RECEIVE_FRIENDSHIP, REMOVE_FRIENDSHIP } from "../actions/friendship_actions";

const friendshipsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_USER:
            if (action.friendships) return action.friendships;
            return state;
        case RECEIVE_USERS:
            if (action.friendships) return action.friendships;
            return state;
        case RECEIVE_FRIENDSHIP:
            newState[action.friendship.id] = action.friendship;
            return newState;
        case REMOVE_FRIENDSHIP:
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
}

export default friendshipsReducer;