<template>
  <button
    class="flex items-center px-2 py-2 font-medium tracking-wide capitalize text-white transition-colors duration-200 transform rounded-md focus:outline-none focus:ring focus:ring-opacity-80"
    :class="color"
  >
    <div class="w-5 h-5 mx-1">
      <slot><BanIcon /></slot>
    </div>
    <span class="mx-1">{{ text }}</span>
  </button>
</template>

<script>
import { BanIcon } from "@heroicons/vue/outline";

export default {
  name: "IconButton",
  props: {
    text: String,
    buttonColor: String,
  },
  components: {
    BanIcon,
  },
  computed: {
    color() {
      if (this.buttonColor === "red") {
        return "bg-error-medium hover:bg-error-dark focus:ring-error-light";
      }
      if (this.buttonColor === "green") {
        return "bg-success-medium hover:bg-success-dark focus:ring-success-light";
      }
      return "bg-primary-medium hover:bg-primary-dark focus:ring-primary-light";
    },
  },
};
</script>
