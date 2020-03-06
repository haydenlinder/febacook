import { $fetchUsers, $fetchUser } from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const REMOVE_USER = "REMOVE_USER";

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
})

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
})

const removeUser = userId => ({
    type: REMOVE_USER
})

export const fetchUsers = () => dispatch => (
    $fetchUsers()
    .then(
        payload => dispatch(receiveUsers(payload))
    )
)

export const fetchUser = userId => dispatch => (
    $fetchUser(userId)
    .then(
        payload => dispatch(receiveUser(payload)),
        payload => dispatch(receiveUserErrors(payload.responseJSON))
    )
)
 
export const updateUser = user => dispatch => (
    $updateUser(user)
    .then(
        payload => dispatch(receiveUser(payload)),
        payload => dispatch(receiveUserErrors(payload.responseJSON))
    )
)
 