<!-- View for looking at different profile display methods -->
<template>
  <large-profile-card :isCurrentUser="true" />
</template>

<script>
import LargeProfileCard from "@/components/UserProfileComponents/LargeProfileCard.vue";

export default {
  components: {
    LargeProfileCard,
  },
};
</script>
