import { tokenHeader } from "@/utils/token-utils";
import axios from "axios";

const API_URL = process.env.VUE_APP_BASEURL;

class CommunityService {
  async getCommunity(communityId) {
    return await axios
      .get(API_URL + "community/" + communityId, {
        headers: tokenHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async getPublicCommunities() {
    return await axios
      .get(API_URL + "communities")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async getCommunityMembers(communityId) {
    return await axios
      .get(API_URL + "community/" + communityId + "/members", {
        headers: tokenHeader(),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default new CommunityService();
