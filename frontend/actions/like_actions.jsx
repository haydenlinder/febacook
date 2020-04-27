import { $createLike, $deleteLike } from "../util/like_api_util"

export const REMOVE_LIKE = 'REMOVE_LIKE';
export const RECEIVE_LIKE = 'RECEIVE_LIKE';

const receiveLike = like => ({
    type: RECEIVE_LIKE,
    like: like
})

const removeLike = id => ({
    type: REMOVE_LIKE,
    id: id
})

export const createLike = like => dispatch => (
    $createLike(like)
    .then(
        payload => dispatch(receiveLike(payload))
    )
)

export const deleteLike = likeId => dispatch => (
    $deleteLike(likeId)
    .then(
        () => dispatch(removeLike(likeId))
    )
)