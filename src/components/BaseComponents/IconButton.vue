<template>
  <!-- Icon button -->
  <button
    class="block w-fit text-white text-base bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    <div class="flex flex-row px-5 py-2.5 h-10">
      <!-- Icon slot: Default content "Ban"-icon -->
      <div class="h-6 w-6">
        <slot>
          <BanIcon />
        </slot>
      </div>
      <p>{{ text }}</p>
    </div>
  </button>
</template>

<script>
import { BanIcon } from "@heroicons/vue/outline";

export default {
  name: "IconButton",
  props: {
    text: String,
  },
  components: {
    BanIcon,
  },
};
</script>
