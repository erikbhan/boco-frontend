import jwt_decode from "jwt-decode";
import store from "@/store";

export function tokenHeader() {
  let token = store.state.user.token;
  return { Authorization: token };
}

export function parseUserFromToken() {
  let token = store.state.user.token;
  console.log(token);
  return jwt_decode();
}
