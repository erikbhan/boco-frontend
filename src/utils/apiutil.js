import axios from "axios";
import { tokenHeader } from "./token-utils";

const API_URL = process.env.VUE_APP_BASEURL;

export function doLogin(loginRequest) {
  return axios
    .post(API_URL + "login/authentication", loginRequest)
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

export async function getUser(userid) {
  return axios
    .get(API_URL + "users/" + userid + "/profile", {
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
    .get(API_URL + "users/" + userid + "", {
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
    .get(API_URL + "users/" + userid + "", {
      headers: tokenHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
