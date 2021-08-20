import {format} from 'timeago.js'

export function unique(arr) {
    return Array.from(new Set(arr))
}

export function postTime(strDate) {
    const date = format(strDate)
    return date
}

export function vaildUser(UserInfo) {
    if (typeof UserInfo === 'object' && '_id' in UserInfo) 
        return true;
    


    return false
}

export function checkReturnHome(UserInfo, history) {
    if (! vaildUser(UserInfo)) 
        history.push('/login')
     else 
        history.push('/')

    

}

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
export function SetFromLocalStorage(value) {
    return localStorage.setItem("userInfo", value)
}
