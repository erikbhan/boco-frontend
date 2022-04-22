<!-- View for looking at different profile display methods -->
<template>
  <v-container>
    <v-row align="center" class="pa-2">
      <large-profile-card :isCurrentUser="true" :userID="2" />
    </v-row>
    <v-row align="center" class="pa-2">
      <large-profile-card :userID="1" :isCurrentUser="false" />
    </v-row>
    <v-row align="center" class="pa-2">
      <user-list-item :userID="1" :ratingType="'Leietaker'" />
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

// Components
import LargeProfileCard from "@/components/UserProfileComponents/LargeProfileCard.vue";
import UserListItem from "@/components/UserProfileComponents/UserListItemCard.vue";

export default defineComponent({
  name: "ProfileView",
  components: {
    LargeProfileCard,
    UserListItem,
  },
});
</script>
