import { $createSession, $createUser, $deleteSession } from "../util/session_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_NULL_SESSION = "RECEIVE_NULL_SESSION";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS"
export const CLEAR_ALL_SESSION_ERRORS = "CLEAR_ALL_SESSION_ERRORS"

const receiveCurrentUser = ({ user, users }) => ({
    type: RECEIVE_CURRENT_USER,
    user,
    users
})

const receiveNullSession = () => ({
    type: RECEIVE_NULL_SESSION
})

const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
})

export const clearSessionErrors = (errors) => ({
    type: CLEAR_SESSION_ERRORS,
    errors
})

export const clearAllSessionErrors = () => ({
    type: CLEAR_ALL_SESSION_ERRORS
})

export const createSession = credentials => dispatch => (
    $createSession(credentials)
    .then(
        payload => dispatch(receiveCurrentUser(payload)),
        payload => dispatch(receiveSessionErrors(payload.responseJSON)),
    )
)

export const createUser = credentials => dispatch => (
    $createUser(credentials)
    .then(
        payload => dispatch(receiveCurrentUser(payload)),
        payload => dispatch(receiveSessionErrors(payload.responseJSON)),
    )
)

export const deleteSession = () => dispatch => (
    $deleteSession()
    .then(
        () => dispatch(receiveNullSession())
    )
)
