import axios from "axios";
import CryptoJS from "crypto-js";
import { decryptedDataFlag, encruptedDataFlag } from '../../constants/global'

export const CONST = {
    // BACKEND_URL: 'https://api.allexchbets.com/v1/',
    // BACKEND_URL: 'https://api.buzz99.in/v1/',
    // SOCKET_URL: 'https://api.buzz99.in/',


    // BACKEND_URL: 'https://api.pbx99.com/v1/',
    // SOCKET_URL: 'https://api.pbx99.com/'

    BACKEND_URL: 'https://api.tvs99.com/v1/',
    SOCKET_URL: 'https://api.tvs99.com/'

    // BACKEND_URL: 'http://192.168.1.19:5001/v1/',
    // SOCKET_URL: 'http://192.168.1.19:5001/'
    // BACKEND_URL2: 'https://api.bmxpro99.com/'
    // BACKEND_URL: 'https://api.bmexch.com/v1/'
};

function authHeader() {
    let user = JSON.parse(localStorage.getItem('user_id'));
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export let apiCall = async (method, path, payload) => {

    // if (decryptedDataFlag) {
    //     const encryptedDataee = CryptoJS.AES.encrypt(JSON.stringify(payload), process.env.REACT_APP_SECRET_KEY_DECREPT).toString();

    //      payload = {
    //         data: encryptedDataee
    //     };

    // }


    try {
        const response = await axios({
            method,
            url: CONST.BACKEND_URL + path,
            data: payload,
            headers: {
                'Content-Type': 'application/json',
                ...authHeader(),
            },
        });

        if (encruptedDataFlag) {
            if (response.data.data) {
                let encruptedData = response.data.data
                const bytes = CryptoJS.AES.decrypt(encruptedData, process.env.REACT_APP_SECRET_KEY + "");
                const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

                if (decryptedData) {
                    response.data.data = JSON.parse(decryptedData)
                }
                // console.log( response.data.data, ' response.data.data')

            }
        }

        return response;

    } catch (error) {
        if (error?.response.data.code == 3 || error?.response.status == 401) {
            localStorage.clear();
            window.location.href = '/signin'

        }
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw error.response;
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response received from the server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error(error.message);
        }
    }
};
