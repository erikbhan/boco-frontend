<template>
  <!-- Icon button -->
  <button
    class="block w-fit text-white text-base bg-primary-medium hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-lg text-center dark:bg-primary-medium dark:hover:bg-primary-dark dark:focus:ring-primary-dark"
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
