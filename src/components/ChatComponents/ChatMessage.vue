<template>
  <div v-bind:class="'blob-container ' + this.side()">
    <div
      v-bind:class="
        this.color() + ' message-container ' +this.textColor()
      "
    >
      <span class="message"
        >{{ this.message.content }}</span
      >
      <span class="">{{ this.calculateTime() }}</span>
    </div>
  </div>
</template>

<style scoped>
  .blob-container {
    display: flex;
    max-width: 100%;
  }

  .message {
    word-break: break-word;
    display: block;
  }

  .message-container {
    border-radius: 10px;
    max-width: 70%;
    padding: 0.75rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem; 
  }
</style>
<script>
import { parseCurrentUser } from "@/utils/token-utils";
//block text-xs text-right
export default {
  props: {
    message: Object,
  },
  data() {
    return {
      abc: "abcde",
    };
  },
  computed: {
    userID() {
      return parseCurrentUser().accountId;
    },
  },
  methods: {
    color() {
      //console.log(this.userID);
      return this?.message.from == this.userID
        ? "bg-gray-300"
        : "bg-primary-medium";
    },
    textColor() {
      return this?.message.from == this.userID ? "text-gray-900" : "text-white";
    },
    side() {
      return this?.message.from == this.userID
        ? "justify-start"
        : "justify-end";
    },
    calculateTime() {
      //let time = this.message.from;
      // Calculate time when message was sent
      let date = new Date(this.message.timestamp);
      let hours = date.getHours();
      let minutes = "0" + date.getMinutes();
      let formattedTime = hours + ":" + minutes.substr(-2);
      return formattedTime;
    },
  },
};
</script>
