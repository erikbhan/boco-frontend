import axios from "axios";
import { tokenHeader } from "./token-utils";

const VUE_APP_BASEURL = "http://65.108.62.223:3000/api/";

export function doLogin(loginRequest) {
  return axios
    .post(VUE_APP_BASEURL + "login/authentication", loginRequest)
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
    .post(VUE_APP_BASEURL + "register", {
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

export async function getUser(userid) {
  return axios
    .get(VUE_APP_BASEURL + "users/" + userid + "/profile", {
      headers: tokenHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getRenterRating(userid) {
  return axios
    .get(VUE_APP_BASEURL + "users/" + userid + "", {
      headers: tokenHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getOwnerRating(userid) {
  return axios
    .get(VUE_APP_BASEURL + "users/" + userid + "", {
      headers: tokenHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
