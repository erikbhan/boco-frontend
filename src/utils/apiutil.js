import axios from "axios";

export function doLogin(loginRequest) {
  return axios
    .post(`http://65.108.62.223:3000/api/login/authentication`, loginRequest)
    .then((response) => {
      return response.data;
    });
}
