import axios from "axios";

export function doLogin(loginRequest) {
  return axios
    .post(`http://localhost:8080/api/login/authentication`, loginRequest)
    .then((response) => {
      return response.data;
    });
}

export function doLoginToken(loginRequest) {
  return axios
    .post("http://localhost:8080/server/token", loginRequest)
    .then((response) => {
      return response.data;
    });
}
