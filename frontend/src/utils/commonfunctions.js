import {format} from 'timeago.js'

/*
remove duplicate from array
*/
export function unique(arr) {
    return Array.from(new Set(arr))
}


/*
calculate post time
*/
export function postTime(strDate) {
    const date = format(strDate)
    return date
}

/*
check whether a vaild user
*/
export function vaildUser(UserInfo) {
    if (typeof UserInfo === 'object' && '_id' in UserInfo) 
        return true;
    


    return false
}

/*
check whether a vaild user and decide to login page or home page
*/
export function checkReturnHome(UserInfo, history) {
    if (! vaildUser(UserInfo)) 
        history.push('/login')
     else 
        history.push('/')


    


}


/*
handle logout
*/

export function Logout(history) {
    localStorage.removeItem("userInfo")
    history.push('/login')
}


/*
get userInfo from local storage
*/
export function getFromLocalStorage() {
    let userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
        try {
            userInfo = JSON.parse(userInfo)
            if (vaildUser(userInfo)) 
                return userInfo
             else 
                return {}


            


        } catch (error) {
            return {}
        }
    } else {
        return {}
    }
}

/*
set userInfo into local storage
*/
export function SetFromLocalStorage(value) {
    return localStorage.setItem("userInfo", JSON.stringify(value))
}
