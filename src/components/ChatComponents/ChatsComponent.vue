<template>
    <div class="chat">
      <div class="conversations">
        <h1 >Samtaler:</h1>
        <hr/>
        <ChatProfile
          v-for="(conversation, i) in conversations"
          :conversation="conversation"
          :key="i"
          @recipient="selectUser"
        ></ChatProfile>
        <div class="button">
          <colored-button text="Ny Samtale"></colored-button>
        </div>
      </div>
      <div class="current-chat">
        <ChatComponent @openHamburger="openHamburger" v-if="recipient" :recipientID="recipient"></ChatComponent>
        <div v-else><p>NOTHING HERE :)</p></div>
      </div>
    </div>
</template>

<script>
import ChatProfile from './ChatProfile.vue';
import ChatComponent from './ChatComponent.vue';
//import ChatMessage from "./ChatMessage.vue";
import axios from "axios";
import { parseCurrentUser } from "@/utils/token-utils";
import ws from "@/services/ws";
import ColoredButton from '../BaseComponents/ColoredButton.vue';

export default {
  props: {

  },
  data: () => {
    return {
      messages: [],
      message: "",
      recipient: null,
      hambuger: "none",
      conversations: [

      ],
      hambugerDisplay: "none"
    };
  },
  components: { ChatProfile, ChatComponent, ColoredButton},
  computed: {
    userid() {
      return parseCurrentUser().accountId;
    },
    recipientID() {
      return this.recipient.userId;
    },
    name() {
      return this.recipient.firstName + " " + this.recipient.lastName;
    },
  },
  methods: {
    selectUser(recipientID) {
      this.hambugerDisplay = "none"
      this.recipient = this.conversations.find(
        (conversation) => conversation.recipient.userId == recipientID
      )?.recipient.userId;

      console.log("New recipient", this.recipient)
    },
    openHamburger() {
      this.hambugerDisplay = "block"
    },
    calculateSide(from) {
      return from == this.userid ? "end" : "start";
    },
    async sendMessage() {
      const token = this.$store.state.user.token;
      await axios.post(
        process.env.VUE_APP_BASEURL +
          `chats/users/${this.recipientID}/messages`,
        {
          message: this.message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.message = "";
      ws.sendMessage({
        sender: parseInt(this.userid),
        recipient: this.recipientID,
      });
      this.reloadMessages();
    },
    async reloadMessages() {
      const token = this.$store.state.user.token;
      const response = await fetch(
        `${process.env.VUE_APP_BASEURL}chats/users/${this.recipientID}/messages`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      this.messages = await response.json();
    },
  },
  async created() {
    const token = this.$store.state.user.token;

    // Get all conversations from api with /chats/users
    const conResponse = await fetch(`${process.env.VUE_APP_BASEURL}chats/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }); // add error handling
    this.conversations = await conResponse.json();
  
    ws.on("NEW_MESSAGE", () => {
      this.reloadMessages();
    });
  },
};
</script>
<style scoped>
  .chat {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: min(100vh - 3.5rem);
  }

  .current-chat {
    width: 100%;
    height: 100%;
  }

  .conversations {
    min-width: 300px;
    border-right-width: 1px;
    border-color: black;
    height: 100%;
  }

  .conversations h1 {
    padding: 0.5rem;  
    padding-left: 0;
  align-self: center;
  margin-left: 10px;
  color: #4b5563;
  font-weight: bold;
  font-size: large;
}

  @media screen and (max-width: 600px) {
    .conversations {
          display: v-bind(hambugerDisplay);
          z-index: 99;
          width: 100%;
          position: absolute;
          background-color: white;
    }

    .conversations h1 {
      text-align: center;
    }
    
  }

  .button {
    display: flex;
    justify-content: center;
    padding: 0.75rem;
  }
</style>