import { $createPost, $fetchPost, $updatePost, $deletePost } from "../util/post_api_util";

export const RECEIVE_POST = "RECEIVE_POST";
export const RECEIVE_POST_ERRORS = "RECEIVE_POST_ERRORS";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const REMOVE_POST = "REMOVE_POST";

const receivePost = post => ({
    type: RECEIVE_POST,
    post
})

const receivePostErrors = errors => ({
    type: RECEIVE_POST_ERRORS,
    errors
})

export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
})

const removePost = postId => ({
    type: REMOVE_POST,
    postId
})

export const createPost = post => dispatch => (
    $createPost(post)
    .then(
        payload => dispatch(receivePost(payload)),
        payload => dispatch(receivePostErrors(payload.responseJSON))
    )
)

export const fetchPost = postId => dispatch => (
    $fetchPost(postId)
    .then(
        payload => dispatch(receivePost(payload)),
        payload => dispatch(receivePostErrors(payload.responseJSON))
    )
)

export const updatePost = post => dispatch => (
    $updatePost(post)
    .then(
        payload => dispatch(receivePost(payload)),
        payload => dispatch(receivePostErrors(payload.responseJSON))
    )
)

export const deletePost = postId => dispatch => (
    $deletePost(postId)
    .then(
        payload => dispatch(removePost(payload)),
        payload => dispatch(receivePostErrors(payload.responseJSON))
    )
)

