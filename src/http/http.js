import axios from "axios";
import { CONST } from '../appRedux/sagas/HTTP'

export const betChipsData = {
  "1000": 1000,
  "2000": 2000,
  "5000": 5000,
  "10000": 10000,
  "20000": 20000,
  "50000": 50000,
  "100000": 100000,
  "250000": 250000,
};

function authHeader() {
  let user = JSON.parse(localStorage.getItem('user_id'));
  if (user && user.token) {
    return { 'Authorization': 'Bearer ' + user.token };
  } else {
    return {};
  }
}

const httpGet = async (url, params, isNotify) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin':'*',
      "Authorization": authHeader().Authorization
    };
    // params = { ...params };
    const result = await axios({
      method: "GET",
      url: CONST.BACKEND_URL + url,
      data: { ...params },
      headers: headers,
    });

    invalidToken(result);

    return result;
  } catch (err) {
    console.error(err);
    // toast.error(err.response.data.message);
    if (err.request.status) {
      invalidHeadres(err.request.status);
    }
  }
};


const httpPost = async (url, params, isNotify) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin':'*',
      "Authorization": authHeader().Authorization
    };
    const result = await axios({
      method: "POST",
      url: CONST.BACKEND_URL + url,
      data: { ...params },
      headers: headers,
    });


    // await invalidToken(result);

    if (result.data) {
      if (result.data.error && isNotify) {
        // error(result.message)
        alert("h1")
      }
      else if (isNotify && !result.data.error) {
        alert("h3")

        // success(result.message)
        //alert(result.data.message)
      }
      return result.data
    } else {
      alert("h2")

      return false
    }
  } catch (err) {
    console.error(err);
    // toast.error(err.response.data.message);
    if (err.request.status) {
      invalidHeadres(err.request.status);
    }
  }
};

const httpPostFormData = async (url, data, isNotify) => {
  try {

    const result = await axios({
      method: "POST",
      url: CONST.BACKEND_URL + url,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });


    // await invalidToken(result);

    if (result.data) {
      if (result.data.error && isNotify) {
        // error(result.message)
        //alert(result.data.message)
      }
      else if (isNotify && !result.data.error) {
        // success(result.message)
        //alert(result.data.message)
      }
      return result.data
    } else {
      return false
    }
  } catch (err) {
    console.error(err);
    // toast.error(err.response.data.message);
    if (err.request.status) {
      invalidHeadres(err.request.status);
    }
  }
};

const httpPatch = async (url, params, isNotify) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin':'*',
      "Authorization": authHeader().Authorization
    };
    const result = await axios({
      method: "PATCH",
      url: CONST.BACKEND_URL + url,
      data: { ...params },
      headers: headers,
    });

    // invalidToken(result);
    if (result.data) {
      if (result.data.error && isNotify) {
        // error(result.message)
        //alert(result.data.message)
      }
      else if (isNotify && !result.data.error) {
        // success(result.message)
        //alert(result.data.message)
      }
    } else {
      return false
    }

    return result.data
  } catch (err) {
    console.error(err);
    if (err.request.status) {
      invalidHeadres(err.request.status);
      //   toast.error(err.response.data.message);
    }
  }
};

const invalidToken = async (result) => {
  if (result.data.code === 3) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/signin";
  }
};

const invalidHeadres = async (status = "") => {
  if (status === 401) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/signin";
  }
};


export { httpGet, httpPost, httpPatch, httpPostFormData };
