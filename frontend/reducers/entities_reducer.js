import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import postsReducer from "./posts_reducer";
import likesReducer from "./likes_reducer";
import commentsReducer from "./comments_reducer";
import friendshipsReducer from "./friendships_reducer";

const entitiesReducer = combineReducers({
    users: usersReducer,
    posts: postsReducer,
    likes: likesReducer,
    comments: commentsReducer,
    friendships: friendshipsReducer
})

export default entitiesReducer;