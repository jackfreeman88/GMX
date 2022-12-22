import { getSingle, logout } from '../services/Auth';
const axios = require('axios');
export default class Rest {
    static async axiosRequest(url, data, reqMethod = '', isMultipart = false, token = '') {
        let headers;
        if (isMultipart) {
            headers = {
                "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
            };
        } else {
            headers = {
                "Content-Type": "application/json",
            };
        }
        if(token != ''){
            headers.Authorization = `Bearer ${token}`;
        }else if (getSingle("token") != null) {
            headers.Authorization = `Bearer ${getSingle("token")}`;
        } else {
            // window.location.replace("/");
        }
        const response = await axios({
            url,
            method: reqMethod !== '' ? reqMethod : "POST",
            headers,
            data,
        }).catch(function (error) {
            return error.response;
        });
        if (response.status && response.status === 401) {
            logout();
        }
        return response;
    }

    static showNotConnectedToInternetMsg() {
        //ToastAndroid.show('You are Offline !', ToastAndroid.LONG);
    }

    static showDefaultErrorMsg() {
        //ToastAndroid.show('Something Went wrong !', ToastAndroid.LONG);
    }

    static async checkConnection() {
        //return await NetInfo.isConnected.fetch();
    }
}
