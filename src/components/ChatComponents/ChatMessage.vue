<template>
  <div v-bind:class="'w-full break-words flex ' + side()">
    <div
      style="max-width: 70%"
      v-bind:class="
        this.color() + ' rounded px-5 py-2 my-2 relative ' + this.textColor()
      "
    >
      <span class="block"
        >{{ this.message.content }} {{ this.message.from }}</span
      >
      <span class="block text-xs text-right">{{ this.calculateTime() }}</span>
    </div>
  </div>
</template>

<script>
import { parseCurrentUser } from "@/utils/token-utils";

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
      console.log(this.userID);
      return this?.message.from == this.userID ? "bg-gray-300" : "bg-blue-600";
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
