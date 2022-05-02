<template>
  <div>
    <LargeProfileCard :isCurrentUser="true" class="md:mt-8" />
  </div>
</template>

<script>
import LargeProfileCard from "@/components/UserProfileComponents/LargeProfileCard.vue";

export default {
  components: {
    LargeProfileCard,
  },
};
</script>
