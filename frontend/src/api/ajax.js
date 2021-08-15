/* request APis */
import axios from 'axios';
import {MAXIMUM_TIMEOUT} from '../utils/const'

export default function ajax(url, data = {}, type = "GET") {
    const {params, body} = data
    let request;
    return new Promise(function (resolve, reject) {
        if (type == "GET") {
            request = axios.get(url, {params, timeout: MAXIMUM_TIMEOUT});
        } else {
            request = axios.post(url, {
                params,
                data: body,
                timeout: MAXIMUM_TIMEOUT
            });
        } request.then(response => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })


}
