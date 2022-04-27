<template>
  <a
    class="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
  >
    <img
      class="h-10 w-10 rounded-full object-cover"
      src="{avatar}"
      alt="{name}"
    />
    <div class="w-full pb-2">
      <div class="flex justify-between">
        <span class="block ml-2 font-semibold text-base text-gray-600"
          >{name}</span
        >
        <span class="block ml-2 text-sm text-gray-600">{lastMessageTime}</span>
      </div>
      <span class="block ml-2 text-sm text-gray-600">{lastMessage}</span>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      required: true,
    },
    lastMessage: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {
      user: {
        name: "",
        avatar: "",
        lastMessage: "",
        lastMessageTime: "5min",
      },
    };
  },
};
</script>
