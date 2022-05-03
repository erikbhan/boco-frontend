import axios from "axios";
import { tokenHeader } from "@/utils/token-utils";

const API_URL = process.env.VUE_APP_BASEURL;

/**
 * Service class acting as a middle layer between our components and the API
 */
class CommunityAdminService {
  async isUserAdmin(communityID) {
    return await axios
      .get(API_URL + "communities/" + communityID + "/user/admin", {
        headers: tokenHeader(),
      })
      .then((res) => {
        return res.data;
      });
  }

  //TODO
  async acceptUserIntoCommunity(communityID, userID) {
    return await axios.post(
      API_URL + "communities/" + communityID + "/requests",
      { params: { userId: userID } }
    );
  }

  //TODO
  async rejectUserFromCommunity(communityID, userID) {
    return await axios.patch(
      API_URL + "communitites/" + communityID + "/requests/reject",
      {
        params: { userId: userID },
      }
    );
  }

  /**
   * Method that kicks a user from a community
   * @param {int} communityID the community to remove the user from
   * @param {int} userID the user to remove
   * @returns TODO
   */
  async removeUserFromCommunity(communityID, userID) {
    return await axios.patch(API_URL + "communities/" + communityID + "/kick", {
      params: { userId: userID },
    });
  }

  /**
   * Method to delete a community
   * @param {int} communityID id of the community to delete.
   * @returns TODO
   */
  async deleteCommunity(communityID) {
    return await axios.post(
      API_URL + "communities/" + communityID + "/remove",
      {
        headers: tokenHeader(),
      }
    );
  }
}

export default new CommunityAdminService();
