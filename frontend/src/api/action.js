import ajax from './ajax'
import {BASEURL} from '../utils/const'

/*
account login
*/
export const login = (username, password) => ajax(BASEURL + "/auth/login", {
    username,
    password
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
