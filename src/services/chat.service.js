import axios from "axios";
import { tokenHeader } from "@/utils/token-utils";

const API_URL = process.env.VUE_APP_BASEURL;

class ChatService {
  async getConversations() {
    return await axios
      .get(API_URL + "chats/users", {
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

export default new ChatService();
