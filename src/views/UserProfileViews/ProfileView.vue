<template>
  <div>
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
