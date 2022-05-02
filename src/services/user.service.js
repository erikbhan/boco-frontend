// import { tokenHeader } from "@/utils/token-utils";
import axios from "axios";

const API_URL = process.env.VUE_APP_BASEURL;

class UserService {
  async getUserFromId(userId) {
    return await axios
      .get(API_URL + "/users/" + userId + "/profile")
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  async getUserRatingAverage(userId) {
    return await axios
      .get(API_URL + "rating/" + userId + "/average")
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  }

  //TODO
  getUserRatingAsOwner() {}

  //TODO
  getUserRatingAsRenter() {}
}

export default new UserService();
