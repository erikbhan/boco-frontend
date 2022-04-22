<template>
  <v-card min-width="350" class="mx-auto py-2">
    <v-img height="250" src="@/assets/defaultUserProfileImage.jpg"></v-img>

    <v-card-title>{{ name }}</v-card-title>

    <v-card-text>
      <rating-component :rating="renterRating" :ratingType="'Leietaker'" />
      <rating-component :rating="ownerRating" :ratingType="'Utleier'" />
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text v-if="isCurrentUser">
      <v-chip class="ma-2" color="primary" outlined pill>
        Mine gjenstander
        <v-icon right> mdi-archive-outline </v-icon>
      </v-chip>

      <v-chip class="ma-2" color="primary" outlined pill>
        Mine grupper
        <v-icon right> mdi-account-multiple-outline </v-icon>
      </v-chip>

      <v-chip class="ma-2" color="primary" outlined pill>
        Leiehistorikk
        <v-icon right> mdi-history </v-icon>
      </v-chip>

      <v-chip class="ma-2" color="primary" outlined pill>
        Endre passord
        <v-icon right> mdi-wrench-outline </v-icon>
      </v-chip>
    </v-card-text>

    <v-card-text v-else>
      <v-chip class="ma-2" color="primary" outlined pill>
        Åpne chat
        <v-icon right> mdi-chat </v-icon>
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
import RatingComponent from "@/components/UserProfileComponents/RatingComponent.vue";

export default {
  name: "LargeProfileCard",
  data() {
    return {
      name: "Navn Navnesen",
      renterRating: 3.5,
      ownerRating: 4.5,
    };
  },
  computed: {
    //user: getUser(userID),
  },
  components: {
    RatingComponent,
  },
  props: {
    userID: Number,
    isCurrentUser: Boolean,
  },
};
</script>
