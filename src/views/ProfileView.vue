<!-- View for looking at different profile display methods -->
<template>
  <v-container>
    <v-row align="center" class="pa-2">
      <large-profile-card :isCurrentUser="true" :userID="2" />
    </v-row>
  </v-container>
</template>

<script>
import LargeProfileCard from "@/components/UserProfileComponents/LargeProfileCard.vue";

export default {
  components: {
    LargeProfileCard,
  },
};
</script>
