/* request APis */
import axios from 'axios';
import {MAXIMUM_TIMEOUT} from '../utils/const'
import jwt_decode from "jwt-decode";
import {BASEURL} from '../utils/const'


const refreshTokenAction = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken")
        const res = await axios.post(BASEURL + "/auth/refresh", {token: refreshToken})
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        return res.data.accessToken
    } catch (err) {
        alert("Wrong")
    }
}


const axiosJWT = axios.create()

axiosJWT.interceptors.request.use(async (config) => {
    let currentDate = new Date();
    const getTokens = localStorage.getItem("accessToken")
    if (getTokens === null) {
        return config
    }
    const decodedToken = jwt_decode(getTokens);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const accessToken = await refreshTokenAction()
        config.headers["authorization"] = `Bearer ${accessToken}`
    } else {
        config.headers["authorization"] = `Bearer ${getTokens}`
    }
    return config;
}, error => {
    return Promise.reject(error)
})

export default function ajax(url, data = {}, type = "GET") {
    const {params, body} = data
    return new Promise(function (resolve, reject) {
        const request = axiosJWT(url, {
            method: type,
            params,
            data: body,
            timeout: MAXIMUM_TIMEOUT
        });
        request.then(response => {
            resolve(response.data)
        }).catch(error => {
            if (error.response&&error.response.status == 401) {
                localStorage.clear()
                alert("Unauthorization users")
                window.location.href = "/login"
            }
            reject(error)
        })
    })
}
