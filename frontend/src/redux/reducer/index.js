import {combineReducers} from 'redux'

const initState = {
    value: "default",
    userInfo: {}
}

const reducer1 = (state = initState.value, action) => {
    switch (action.type) {
        case "setPosts":
            return action.value;
        default:
            return state;
    }
}


const userInfoSet = (state = initState.userInfo, action) => {
    switch (action.type) {
        case "setUser":
            return action.value;
        default:
            return state;
    }
}


export default combineReducers([reducer1, userInfoSet])
