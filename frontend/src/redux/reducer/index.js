import {combineReducers} from 'redux'
import {getFromLocalStorage, SetFromLocalStorage} from '../../utils/commonfunctions'


const userInfo = getFromLocalStorage();
const feeds = {};

const reducer1 = (state = feeds, action) => {
    switch (action.type) {
        case "setPosts":
            return action.value;
        default:
            return state;
    }
}


const userInfoSet = (state = userInfo, action) => {
    switch (action.type) {
        case "setUser":
            {
                SetFromLocalStorage(JSON.stringify(action.value))
                return action.value
            }
        default:
            return state;
    }
}


export default combineReducers({reducer1, userInfo: userInfoSet})
