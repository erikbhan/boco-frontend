import axios from "axios";
import { tokenHeader } from "@/utils/token-utils";

const API_URL = process.env.VUE_APP_BASEURL;

/**
 * Service class acting as a middle layer between our components and the API
 */
class CommunityAdminService {
  async isUserAdmin() {
    return await axios
      .get(
        API_URL +
          "communities/" +
          this.$route.params.communityID +
          "/user/admin",
        {
          headers: tokenHeader(),
        }
      )
      .then((res) => {
        return res.data;
      });
  }

  //TODO
  acceptUserIntoCommunity() {}

  //TODO
  rejectUserFromCommunity() {}

  //TODO
  async removeUserFromCommunity(user, community) {
    return await axios.post(API_URL + "communities/" + community.id + "/leave");
  }

  /**
   * Method to delete a community
   * @param {int} communityId id of the community to delete.
   * @returns TODO
   */
  async deleteCommunity(communityId) {
    return await axios.post(
      API_URL + "communities/" + communityId + "/remove",
      {
        headers: tokenHeader(),
      }
    );
  }
}

export default new CommunityAdminService();
