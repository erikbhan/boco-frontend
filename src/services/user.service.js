// import { tokenHeader } from "@/utils/token-utils";
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

    async getUserRatingAsOwner(userId) {
        return await axios
            .get(API_URL + "rating/" + userId + "/average/owner", {
                headers: tokenHeader(),
            })
            .then((res) => {
                return res.data;
            })
            .catch((err) => console.error(err))
    }

    async getUserRatingAsRenter(userId) {
        return await axios
            .get(API_URL + "rating/" + userId + "/average/renter", {
                headers: tokenHeader(),
            })
            .then((res) => {
                return res.data;
            })
            .catch((err) => console.error(err))
    }
}
    export
    default
    new
    UserService();