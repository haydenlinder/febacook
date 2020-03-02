{
    entities: {
        users: {
            1: {
                id: 1,
                username: "ender",
                firstName: "Andrew",
                lastName: "Wiggin"
            }
            2: {
                id: ,
                username: "stag",
                firstName: "Harry",
                lastName: "Potter"
            }
        },
        posts: {
            1: {
                id: 1,
                authorId: 1,
                recipientId: 1,
                body: "My first wall post",
                udpatedAt: 2020-02-03 02:14:45.519582,
                createdAt: 2020-02-03 02:14:45.519582,
            }
            2: {
                id: 2,
                authorId: 1,
                recipientId: 2,
                body: "Great to see you here!"
                udpatedAt: 2020-02-04 04:36:19.389406,
                createdAt: 2020-02-04 04:36:19.389406
            }
        },
        comments: {
            1: {
                id: 1,
                authorId: 2,
                postId: 1,
                body: "Cool website!",
                udpatedAt: 2020-02-03 02:14:45.519582,
                createdAt: 2020-02-03 02:14:45.519582,
            }
            2: {
                id: 1,
                authorId: 2,
                postId: 2,
                body: "likewise!",
                udpatedAt: 2020-02-03 02:14:45.519582,
                createdAt: 2020-02-03 02:14:45.519582,
            }       
        }
    },
    session: { currentUserId: 2 },
    ui: { loading: true/false },
    errors: {
        login: ["Incorrect username/password combination"],
        newUserForm: ["Password must be at least 6 characters"]
    }
}