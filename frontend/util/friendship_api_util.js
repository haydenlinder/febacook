export const $createFriendship = (friendship) => (
    $.ajax({
        url: `api/friendships`,
        method: `POST`,
        data: friendship
    })
);

export const $updateFriendship = (friendship) => (
    $.ajax({
        url: `api/friendships/${friendship.id}`,
        method: `PATCH`,
        data: friendship
    })
);

export const $deleteFriendship = id => (
    $.ajax({
        url: `api/friendships/${id}`,
        method: `DELETE`
    })
);