export const $fetchUsers = () => (
    $.ajax({
        url: `/api/users`,
        method: `GET`
    })
)

export const $fetchUser = username => (
    $.ajax({
        url: `/api/users/${username}`,
        method: `GET`
    })
)

export const $updateUser = user => (
    $.ajax({
        url: `/api/users/${user.id}`,
        method: `PATCH`,
        data: { user: user }
    })
)