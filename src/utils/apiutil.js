import axios from "axios";
import { tokenHeader } from "./token-utils";

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

export function getUser(userid) {
  return axios
    .get(`http://65.108.62.223:3000/api/user/` + userid, {
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
    .get(`http://65.108.62.223:3000/api/user/renter-rating/` + userid, {
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
    .get(`http://65.108.62.223:3000/api/user/owner-rating/` + userid, {
      headers: tokenHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
