<template>
  <button
    class="block text-white bg-primary-medium hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-medium dark:hover:bg-primary-dark dark:focus:ring-primary-light"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ColoredButton",
  props: {
    text: String,
  },
};
</script>
