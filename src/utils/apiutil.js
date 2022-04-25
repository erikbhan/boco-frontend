import axios from "axios";

const API_URL = "http://65.108.62.223:3000/api/";

export function doLogin(loginRequest) {
  return axios
    .post(process.env.VUE_APP_BASEURL + "login/authentication", loginRequest)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
}

export function registerUser(registerInfo) {
  return axios
    .post(API_URL + "register", {
      email: registerInfo.email,
      firstName: registerInfo.firstName,
      lastname: registerInfo.lastname,
      password: registerInfo.password,
      address: registerInfo.address,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
}
