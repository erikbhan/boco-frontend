import axios from "axios";

export function doLogin(loginRequest) {
  return axios
    .post(`http://localhost:8080/api/login/authentication`, loginRequest)
    .then((response) => {
      return response.data;
    });
}
