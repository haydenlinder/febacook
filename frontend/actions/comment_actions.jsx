import { $createComment, $deleteComment, $updateComment } from "../util/comment_api_util"

export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';

const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment: comment
})

const removeComment = id => ({
    type: REMOVE_COMMENT,
    id: id
})

export const createComment = comment => dispatch => (
    $createComment(comment)
        .then(
            payload => dispatch(receiveComment(payload))
        )
)

export const deleteComment = commentId => dispatch => (
    $deleteComment(commentId)
        .then(
            () => dispatch(removeComment(commentId))
        )
)

export const updateComment = comment => dispatch => (
    $updateComment(comment)
    .then(
        payload => dispatch(receiveComment(payload))
    )
)