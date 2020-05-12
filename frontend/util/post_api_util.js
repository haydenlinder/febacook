export const $createPost = post => (
    $.ajax({
        url: `api/posts`,
        method: `POST`,
        data: post,
        contentType: false,
        processData: false
    })
);

export const $fetchPost = postId => (
    $.ajax({
        url: `api/posts/${postId}`,
        method: `GET`
    })
);

export const $fetchPosts = path => (
    $.ajax({
        url: `api/posts/`,
        method: `GET`
    })
);

export const $updatePost = (post, id) => (
    $.ajax({
        url: `api/posts/${id}`,
        method: `PATCH`,
        data: post,
        contentType: false,
        processData: false
    })
);

export const $deletePost = postId => (
    $.ajax({
        url: `api/posts/${postId}`,
        method: `DELETE`
    })
);

