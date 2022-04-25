import axios from "axios";

export function doLogin(loginRequest) {
  return axios
    .post(process.env.VUE_APP_BASEURL + 'login/authentication', loginRequest)
    .then((response) => {
      return response.data;
    })
      .catch((error) => {
          console.log(error.response);
          return error.response;
      });
}
