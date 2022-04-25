import axios from "axios";

export function doLogin(loginRequest) {
  const auth = {isLoggedIn: false, token: ""};
  return axios
    .post(process.env.VUE_APP_BASEURL + "login/authentication", loginRequest)
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
