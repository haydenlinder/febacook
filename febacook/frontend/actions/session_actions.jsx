import { $createSession, $createUser, $deleteSession } from "../util/session_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_NULL_SESSION = "RECEIVE_SESSION_ERRORS";

const receiveCurrentUser = id => ({
    type: RECEIVE_SESSION,
    id
})

const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
})

const receiveNullSession = () => ({
    type: RECEIVE_NULL_SESSION
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

export const deleteSession = credentials => dispatch => (
    $deleteSession(credentials)
    .then(
        () => dispatch(receiveNullSession())
    )
)
