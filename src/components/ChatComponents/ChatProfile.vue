<template>
  <a
    v-on:click="selectUser"
    class="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
  >
    <img
      class="h-10 w-10 rounded-full object-cover"
      src="https://www.mintface.xyz/content/images/2021/08/QmTndiF423kjdXsNzsip1QQkBQqDuzDhJnGuJAXtv4XXiZ-1.png"
      :alt="{ name }"
    />
    <div class="w-full pb-2">
      <div class="flex justify-between">
        <span class="block ml-2 font-semibold text-base text-gray-600">{{
          name
        }}</span>
        <span class="block ml-2 text-sm text-gray-600">{{
          lastMessageTime
        }}</span>
      </div>
      <span class="block ml-2 text-sm text-gray-600">{{ lastMessage }}</span>
    </div>
  </a>
</template>

<script>
//TODO fix avatar
export default {
  props: {
    conversation: {
      type: Object,
      required: true,
    },
    recipient: Function,
  },
  data: () => {
    return {};
  },
  computed: {
    lastMessage() {
      return this.conversation.lastMessage.content;
    },
    name() {
      return (
        this.conversation.recipient.firstName +
        " " +
        this.conversation.recipient.lastName
      );
    },
    lastMessageTime() {
      return "5 min";
    },
  },
  methods: {
    selectUser() {
      console.log(this.conversation?.recipient.userId);
      this.$emit("recipient", this.conversation?.recipient.userId);
    },
  },
  created() {
    console.log("convesation", this.conversation);
  }
};
</script>
