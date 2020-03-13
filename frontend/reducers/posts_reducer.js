import { RECEIVE_POSTS, RECEIVE_POST, REMOVE_POST } from "../actions/post_actions";
import { RECEIVE_USER, RECEIVE_USERS } from "../actions/user_actions";

const postsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_POSTS:
            return action.posts
        case RECEIVE_POST:
            nextState[action.post.id] = action.post
            return nextState;
        case REMOVE_POST:
            delete nextState[action.postId]
            return nextState;
        case RECEIVE_USER:
            return action.posts
        case RECEIVE_USERS:
            if (action.posts) return action.posts
            return {}
        default:
            return state;
    }
}

export default postsReducer;