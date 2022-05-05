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

  async setListingToDeleted(listingId) {
    console.log(tokenHeader());
    return await axios
      .put(API_URL + "listing/" + listingId, {
        headers: {Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaX…5vIn0.4GOdg2HsKb5ubJjkO674gQRO4C0RSIsHa4X-MI2ftHg'},
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
      console.error(err);
    })
  }

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

  async getUserRatingAsRenter(userId) {
    return await axios
      .get(API_URL + "rating/" + userId + "/average/renter", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));
  }

  async getUserRatingAsOwner(userId) {
    return await axios
      .get(API_URL + "rating/" + userId + "/average/owner", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));
  }
}
export default new UserService();
