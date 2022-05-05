<template>
  <button
    class="flex items-center px-2 py-2 font-medium tracking-wide capitalize text-white transition-colors duration-200 transform rounded-md focus:outline-none focus:ring focus:ring-opacity-80 min-w-{20px}"
    :class="color"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ColoredButton",
  props: {
    text: String,
    buttonColor: {
      type: String,
      default: "blue",
    },
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
