import { $createFriendship, $updateFriendship, $deleteFriendship } from "../util/friendship_api_util";

export const RECEIVE_FRIENDSHIP = 'RECEIVE_FRIENDSHIP';
export const REMOVE_FRIENDSHIP = 'REMOVE_FRIENDSHIP';

const receiveFriendship = friendship => ({
    type: RECEIVE_FRIENDSHIP,
    friendship: friendship
});

const removeFriendship = id => ({
    type: REMOVE_FRIENDSHIP,
    id: id
});

export const createFriendship = friendship => dispatch => (
    $createFriendship(friendship)
    .then(
        payload => dispatch(receiveFriendship(payload))
    )
);

export const updateFriendship = friendship => dispatch => (
    $updateFriendship(friendship)
    .then(
        payload => dispatch(receiveFriendship(payload))
    )
);

export const deleteFriendship = id => dispatch => (
    $deleteFriendship(id)
    .then(
        () => dispatch(removeFriendship(id))
    )
);