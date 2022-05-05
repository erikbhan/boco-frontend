<template>
  <div v-bind:class="'blob-container ' + this.side()">
    <div v-bind:class="this.color() + ' message-container ' + this.textColor()">
      <span class="message">{{ this.message.content }}</span>
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
      /*
        Take timestamp and display date when message was sent
        If message was sent this day show time (HH:MM) (13:00)
        If message was sent this week show day of the week and time (DDD HH:MM) (Mon 13:00)
        If message was sent this month show day of the month, date and time (DD HH:MM) (13 13:00)
        If message was sent this year show month and day of the month (MM DD) (Jan 13)
        If message was sent more than a year ago show year with date (MMM DD YYYY) (Jan 13 2020)
      */
      const date = new Date(this.message.timestamp);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      const diffWeeks = Math.ceil(diff / (1000 * 3600 * 24 * 7));
      const diffMonths = Math.ceil(diff / (1000 * 3600 * 24 * 30));
      const diffYears = Math.ceil(diff / (1000 * 3600 * 24 * 365));
      
      return "13:00"
    },
  },
};
</script>
