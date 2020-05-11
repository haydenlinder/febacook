import { RECEIVE_POSTS, RECEIVE_POST, REMOVE_POST } from "../actions/post_actions";
import { RECEIVE_USER, RECEIVE_USERS } from "../actions/user_actions";
import { RECEIVE_COMMENT, REMOVE_COMMENT } from "../actions/comment_actions"

const commentsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        // case RECEIVE_POSTS:
        //     return action.comments
        // case RECEIVE_POST:
        //     nextState[action.post.id] = action.post
        //     return nextState;
        // case REMOVE_POST:
        //     delete nextState[action.postId]
        //     return nextState;
        case RECEIVE_COMMENT:
            nextState[action.comment.id] = action.comment;
            return nextState;
        case REMOVE_COMMENT:
            delete nextState[action.id];
            return nextState;
        case RECEIVE_USER:
            if (action.comments) {
                Object.values(action.comments).forEach(comment => nextState[comment.id] = comment)
                return nextState;
            };
            return state;
        case RECEIVE_USERS:
            if (action.comments) {
                Object.values(action.comments).forEach(comment => nextState[comment.id] = comment)
                return nextState;
            };
            return {}
        default:
            return state;
    }
}

export default commentsReducer;