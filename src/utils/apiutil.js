import axios from "axios";

const API_URL = "http://65.108.62.223:3000/api/";

export function doLogin(loginRequest) {
  return axios
    .post(API_URL + "login/authentication", loginRequest)
    .then((response) => {
      return response.data;
    });
}

export function registerUser(registerInfo) {
  return axios
    .post(API_URL + "register", {
      email: registerInfo.email,
      firstName: registerInfo.fname,
      lastname: registerInfo.lname,
      password: registerInfo.pword,
      address: registerInfo.address,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
}
