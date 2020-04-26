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

export const $updateUser = formData => (
    $.ajax({
        url: `/api/users/${formData.get('user[id]')}`,
        method: `PATCH`,
        data: formData,
        contentType: false,
        processData: false
    })
)

export const $fetchUsersByNameFragment = nameFragment => (
    $.ajax({
        url: `/api/users?nameFragment=${nameFragment}`,
        method: `GET`
    })
)