<template>
  <div>
    <large-profile-card :isCurrentUser="true" class="align-top" />
  </div>
</template>

<script>
import LargeProfileCard from "@/components/UserProfileComponents/UserProfile.vue";

export default {
  components: {
    LargeProfileCard,
  },
};
</script>
