import axios from "axios";
import { tokenHeader } from "./token-utils";

const API_URL = process.env.VUE_APP_BASEURL;

export function doLogin(loginRequest) {
  const auth = { isLoggedIn: false, token: "" };
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
    .get(API_URL + "rating/" + userid + "/as_owner", {
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
    .get(API_URL + "rating/" + userid + "/as_renter", {
      headers: tokenHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getAverageRating(userid) {
  return axios
    .get(API_URL + "rating/" + userid + "/average", {
      headers: tokenHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
export function doNewPassword() {
  //m
  //add newPasswordInfo to input
  const auth = { newPasswordSet: false };
  //return axios
  //.post(API_URL + "newPassword", newPasswordInfo)
  //.then((response) => {auth.newPasswordSet = true;return auth;})
  //.catch((error) => {console.log(error);return auth;});
  return auth; //remove after axios is added
}

export function postNewItem(itemInfo) {
  return axios
    .post(API_URL + "listing", itemInfo, {
      headers: tokenHeader(),
    })
    .then((response) => {
      console.log("poster: " + response.data);
      return response;
    })
    .catch((error) => {
      console.log(error.response);
      return error;
    });
}

export function postNewgroup(groupInfo) {
  return axios
    .post(API_URL + "communities/create", groupInfo, { headers: tokenHeader() })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error.response);
      return error;
    });
}
export function postNewRent(rentInfo) {
  return axios
    .post(API_URL + "renting/renter/save", rentInfo, {
      headers: tokenHeader(),
    })
    .then((response) => {
      console.log("poster: " + response.data);
      return response;
    })
    .catch((error) => {
      console.log(error.response);
      return error;
    });
}

export function getMyGroups() {
  return axios
    .get(API_URL + "user/communities", {
      headers: tokenHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getVisibleGroups() {
  return axios
    .get(API_URL + "communities", {
      headers: tokenHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getItem(itemid) {
  return axios
    .get(API_URL + "listing/" + itemid, {
      headers: tokenHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getItemPictures(itemid) {
  let res = await axios
    .get(API_URL + "listing/" + itemid + "/pictures", {
      headers: tokenHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return res;
}

export async function GetCommunity(communityID) {
  return axios
    .get(API_URL + "community/" + communityID, {
      headers: tokenHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function GetListingsInCommunity(communityID) {
  return axios
    .get(API_URL + "community/" + communityID + "/listings", {
      headers: tokenHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function GetMembersOfCommunity(communityID) {
  return axios
    .get(API_URL + "community/" + communityID + "/members", {
      headers: tokenHeader(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function JoinOpenCommunity(communityId) {

    if(tokenHeader().Authorization == "Bearer " + null){
        console.log("ikke logget på!");
        return "Login to join any community";
    }

    return axios
        .post(API_URL + "communities/" + communityId + "/join", communityId, {
            headers: tokenHeader(),
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error.response);
            return error;
        });
}

export async function GetIfUserAlreadyInCommunity(communityID) {
    if(tokenHeader().Authorization == "Bearer " + null){
        return false;
    }

    return axios
        .get(API_URL + "communities/" + communityID + "/user/status", {
            headers: tokenHeader(),
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}
