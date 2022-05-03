<template>
  <div class="chat-container">
    <div class="header">
      <div
        v-on:click="openHamburgerMethod"
        class="hamburger grid space-y-2 content-center m-3"
      >
        <div class="w-8 h-0.5 bg-gray-600"></div>
        <div class="w-8 h-0.5 bg-gray-600"></div>
        <div class="w-8 h-0.5 bg-gray-600"></div>
      </div>
      <div class="flex">
        <img class="pfp" :src="this.src" alt="Profile Picture" />
        <h1>{{ name }}</h1>
      </div>
      <div></div>
    </div>
    <div class="conversation">
      <ChatMessage
        v-for="(message, i) in messages"
        v-bind:key="i"
        :message="message"
      ></ChatMessage>
      <rental-message></rental-message>
    </div>
    <div
      class="
        flex
        items-center
        justify-between
        w-full
        p-3
        border-t border-gray-300
      "
    >
      <input
        v-on:keyup.enter="sendMessage"
        type="text"
        placeholder="Message"
        class="
          block
          w-full
          py-2
          pl-4
          mx-3
          bg-gray-100
          rounded-full
          outline-none
          focus:text-gray-700
        "
        name="message"
        v-model="message"
      />
      <button v-on:click="sendMessage" style="padding: 10px; color: red">
        <svg
          class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import ChatMessage from "./ChatMessage.vue";
import axios from "axios";
import ws from "@/services/ws";
import RentalMessage from "./RentalMessage.vue";
export default {
  props: {
    openHamburger: { type: Function },
    recipientID: {
      type: Number,
    },
  },
  data() {
    return {
      messages: [],
      canScroll: true,
      scrollBehavior: "",
      recipient: null,
    };
  },
  components: {
    ChatMessage,
    RentalMessage
  },
  computed: {
    name() {
      console.log(this.recipient);
      return this.recipient
        ? this.recipient.firstName + " " + this.recipient.lastName
        : "N/A";
    },
    src() {
        return this.recipient?.picture
    }
  },
  methods: {
    openHamburgerMethod() {
      this.$emit("openHamburger");
    },
    scroll() {
      let container = this.$el.querySelector(".conversation");
      container.scrollTop = container.scrollHeight;
    },
    async sendMessage() {
      if (this.message == null || this.message == "") return;
      this.canScroll = true;
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
    async getRecipient() {
      const token = this.$store.state.user.token;
      const response = await fetch(
        `${process.env.VUE_APP_BASEURL}users/${this.recipientID}/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      this.recipient = await response.json();
    },
  },
  watch: {
    async recipientID() {
      await this.reloadMessages();
      await this.getRecipient();
    },
  },
  async created() {
    await this.reloadMessages();
    await this.getRecipient();
  },
  updated() {
    if (this.canScroll) this.scroll();
    this.canScroll = false;
    this.scrollBehavior = "smooth";
  },
};
</script>

<style scoped>
.hamburger {
  display: none;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: auto;
}

.conversation {
  height: 100%;
  width: 100%;
  padding: 1.25rem;
  overflow-y: scroll;
  scroll-behavior: v-bind(scrollBehavior);
}

.header {
  display: flex;
  flex-direction: row;
  padding: 0.75rem;
  border-bottom: 1px solid black;
}

.header h1 {
  align-self: center;
  margin-left: 10px;
  color: #4b5563;
  font-weight: bold;
}

.pfp {
  object-fit: cover;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}

@media screen and (max-width: 600px) {
  .header {
    justify-content: space-between;
  }

  .hamburger {
    display: block;
  }
}
</style>