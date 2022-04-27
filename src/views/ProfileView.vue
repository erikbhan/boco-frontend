<template>
  <div class="h-screen bg-gray-200 grid place-items-center">
    <large-profile-card :isCurrentUser="true" class="align-top" />
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
