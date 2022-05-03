<template>
  <div class="flex flex-col h-full overflow-hidden border-2">
    <div class="flex flex-row h-full border-2 bg-gray-50">
      <div class="basis-1/3">
        <h1 class="text-center text-l">Mine samtaler</h1>
        <ul v-if="conversations" class="border-2">
          <li
            v-for="conversation in conversations"
            :key="conversation.recipient.userId"
          >
            <ChatProfile :conversation="conversation" @recipient="selectUser" />
          </li>
        </ul>
      </div>
      <div class="basis-2/3">
        <CurrentChat v-if="selected" :recipient="selected" />
      </div>
    </div>
  </div>
  <!-- <div class="min-h-full">
    <div class="border rounded grid grid-cols-3 w-full">
      <div class="border-r border-gray-300 col-span-1">
        <ul class="hidden sm:block overflow-auto h-full">
          <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
          <li v-if="conversations">
          </li>
        </ul>
      </div>
    </div>
  </div> -->
</template>

<script>
import ChatProfile from "@/components/ChatComponents/ChatProfile.vue";
import CurrentChat from "@/components/ChatComponents/CurrentChat.vue";
import { parseCurrentUser } from "@/utils/token-utils";
import ChatService from "@/services/chat.service";

export default {
  components: {
    ChatProfile,
    CurrentChat,
  },
  data() {
    return {
      conversations: null,
      selected: null,
    };
  },
  computed: {
    key() {
      return this.selected.userId || "ERROR";
    },
  },
  methods: {
    userID() {
      return parseCurrentUser().accountId;
    },
    selectUser(value) {
      const userid = value;
      this.conversations.find((conversation) => {
        return conversation.recipient.userId == userid;
      });
      this.selected = this.conversations.find(
        (conversation) => conversation.recipient.userId == userid
      ).recipient;
      //console.log(this.selected);
    },
  },
  async created() {
    this.conversations = await ChatService.getConversations(this.userID());
    if (this.$route.params.userId !== null) {
      this.selectUser(this.$route.params.userId);
    }
  },
};
</script>
