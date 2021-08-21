import ajax from './ajax'
import {BASEURL} from '../utils/const'

/*
account login
*/
export const login = (email, password) => ajax(BASEURL + "/auth/login", {
    body: {
        email,
        password
    }
}, 'POST')


/*
account register
*/
export const register = (username, email, password) => ajax(BASEURL + "/auth/register", {
    body: {
        username,
        email,
        password
    }
}, 'POST')

/*
Post
*/
export const post = ({userId, description, image}) => ajax(BASEURL + "/post", {
    body: {
        userId,
        description,
        image
    }
}, 'POST')


/*
Post get all posts
*/
export const getFeeds = (userId) => ajax(BASEURL + "/post/timeline/" + userId, {})

/*
Post get all posts from user list
*/
export const getFeedsFromUserList = (userIdArray) => {
    const promiseArray = userIdArray.map(userId => getFeeds(userId));
    return Promise.all(promiseArray)
}

/* like or dislike post */
export const likePost = (userId, postId) => ajax(BASEURL + "/post/like/" + postId, {
    body: {
        userId
    }
}, "PUT")
/*
Get user
*/
export const getUser = (userId) => ajax(BASEURL + "/user", {
    params: {
        id: userId
    }
})


/*
Get User name from userId
 */
export const getUsernname = (userIdArray) => {
    const promiseArray = userIdArray.map(userId => getUser(userId))
    return Promise.all(promiseArray)
}


/*
upload images
*/
export const upload = (data) => ajax(BASEURL + "/upload", {
    body: data
}, 'POST')
