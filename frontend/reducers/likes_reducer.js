import { RECEIVE_POSTS, RECEIVE_POST, REMOVE_POST } from "../actions/post_actions";
import { RECEIVE_USER, RECEIVE_USERS } from "../actions/user_actions";
import { RECEIVE_LIKE, REMOVE_LIKE } from "../actions/like_actions"

const likesReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        // case RECEIVE_POSTS:
        //     return action.likes
        // case RECEIVE_POST:
        //     nextState[action.post.id] = action.post
        //     return nextState;
        // case REMOVE_POST:
        //     delete nextState[action.postId]
        //     return nextState;
        case RECEIVE_LIKE:
            nextState[action.like.id] = action.like;
            return nextState;
        case REMOVE_LIKE:
            delete nextState[action.id];
            return nextState;
        case RECEIVE_USER:
            if (action.likes) return action.likes;
            return state;
        case RECEIVE_USERS:
            if (action.likes) return action.likes;
            return {}
        default:
            return state;
    }
}

export default likesReducer;