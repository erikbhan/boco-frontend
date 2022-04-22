<template>
  <v-card class="pa-2" max-height="100" width="90%" outlined tile>
    <v-row align="center" class="spacer" no-gutters>
      <v-col cols="4" sm="2" md="1">
        <v-avatar size="60">
          <v-img src="@/assets/defaultUserProfileImage.jpg"></v-img>
        </v-avatar>
      </v-col>

      <v-col class="hidden-xs-only" sm="5" md="3">
        <v-card-title> {{ name }} </v-card-title>
      </v-col>

      <v-col>
        <v-card-text>
          <div>{{ ratingType }} rating:</div>

          <v-rating
            v-model="rating"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
        </v-card-text>
      </v-col>

      <v-col offset="4">
        <v-card-text>
          <v-chip v-if="admin" class="ma-2" color="error" outlined pill>
            Fjern bruker
            <v-icon right> mdi-trash-can-outline </v-icon>
          </v-chip>
          <v-chip v-else class="ma-2" color="primary" outlined pill>
            Åpne chat
            <v-icon right> mdi-chat </v-icon>
          </v-chip>
        </v-card-text>
      </v-col>
    </v-row>
    <v-col> </v-col>
  </v-card>
</template>

<script>
export default {
  name: "UserListItem",
  data() {
    return {
      name: "Navn Navnesen",
      rating: 3,
      admin: true,
    };
  },
  computed: {
    //user: getUser(userID),
  },
  props: {
    userID: Number,
    ratingType: String,
  },
};
</script>
