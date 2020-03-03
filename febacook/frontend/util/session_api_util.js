export const $createSession = credentials => (
    $.ajax({
        url: `api/session`,
        method: `POST`,
        data: { user: credentials }
    })
)

export const $deleteSession = () => (
    $.ajax({
        url: `api/session`,
        method: `DELETE`
    })
)

export const $createUser = user => (
    $.ajax({
        url: `/api/users`,
        method: `POST`,
        data: { user: user }
    })
)