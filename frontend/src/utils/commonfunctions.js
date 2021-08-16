import {format} from 'timeago.js'

export function unique(arr) {
    return Array.from(new Set(arr))
}

export function postTime(strDate) {
    const date = format(strDate)
    return date
}
