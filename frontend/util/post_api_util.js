export const $createPost = post => (
    $.ajax({
        url: `api/posts`,
        method: `POST`,
        data: { post: post }
    })
)

export const $fetchPost = postId => (
    $.ajax({
        url: `api/posts/${postId}`,
        method: `GET`
    })
)

export const $fetchPosts = path => (
    $.ajax({
        url: `api/posts/`,
        method: `GET`
    })
)

export const $updatePost = post => (
    $.ajax({
        url: `api/posts/${postId}`,
        method: `PATCH`,
        data: { post: post }
    })
)

export const $deletePost = postId => (
    $.ajax({
        url: `api/posts${postId}`,
        method: `DELETE`
    })
)

