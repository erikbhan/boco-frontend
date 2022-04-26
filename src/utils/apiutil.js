import axios from "axios";

const API_URL = process.env.VUE_APP_BASEURL;

export function doLogin(loginRequest) {
  const auth = {isLoggedIn: false, token: ""};
  return axios
    .post(API_URL + "login/authentication", loginRequest)
    .then((response) => {
      auth.isLoggedIn = true;
      auth.token = response.data;
      return auth;
    })
    .catch((error) => {
      console.log(error.response);
      return auth;
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
