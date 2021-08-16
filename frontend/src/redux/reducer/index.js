import {combineReducers} from 'redux'

const initState = {
    value: "default",
    userInfo: {
        "avatar": "/utils/1.jpg",
        "coverPicture": "/utils/2.jpg",
        "followers": [],
        "followings": [
            "6113db83a20ac4d603a7406a", "6113dbfea20ac4d603a74073"
        ],
        "_id": "6113dba8a20ac4d603a7406f",
        "username": "pad",
        "email": "pad@example.com",
        "createdAt": "2021-08-11T14:16:08.079Z"
    }
}

const reducer1 = (state = initState, action) => {
    switch (action.type) {
        case "setPosts":
            return action.value;
        default:
            return state.value;
    }
}


const userInfoSet = (state = initState, action) => {
    switch (action.type) {
        case "setUser":
            return action.value;
        default:
            return state.userInfo;
    }
}


export default combineReducers({reducer1, userInfo: userInfoSet})
