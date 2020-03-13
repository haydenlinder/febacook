import { $fetchUsers, $fetchUser, $updateUser } from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const REMOVE_USER = "REMOVE_USER";

const receiveUser =  ({ user, posts }) => ({
    type: RECEIVE_USER,
    user,
    posts
})

const receiveUsers = ({users, posts}) => ({
    type: RECEIVE_USERS,
    users,
    posts
})

const receiveUserErrors = errors => ({
    type: RECEIVE_USER_ERRORS,
    errors
})

export const fetchUsers = () => dispatch => (
    $fetchUsers()
    .then(
        payload => dispatch(receiveUsers(payload))
    )
)

export const fetchUser = username => dispatch => (
    $fetchUser(username)
    .then(
        payload => dispatch(receiveUsers(payload)),
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
 