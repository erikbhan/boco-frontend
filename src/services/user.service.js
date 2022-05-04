import { tokenHeader } from "@/utils/token-utils";
import axios from "axios";

const API_URL = process.env.VUE_APP_BASEURL;

class UserService {
  async getUserFromId(userId) {
    return await axios
      .get(API_URL + "users/" + userId + "/profile", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));
  }

  async getUserRatingAverage(userId) {
    return await axios
      .get(API_URL + "rating/" + userId + "/average", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));
  }

  //TODO
  async getUserRatingAsOwner() {}

  //TODO
  async getUserRatingAsRenter() {}

  async getRenterHistory() {
    return await axios
      .get(API_URL + "user/profile/rent/history", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
        return [];
      });
  }

  async getOwnerHistory() {
    return await axios
      .get(API_URL + "user/profile/rent/history/owner", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async isRated(rentID) {
    return await axios
      .get(API_URL + "rating/" + rentID + "/israted", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export default new UserService();
