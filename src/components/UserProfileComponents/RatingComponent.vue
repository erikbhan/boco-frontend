<template>
  <v-row class="mb-6" justify="start" dense>
    <v-col cols="5">
      <div>{{ ratingType }} rating:</div>
    </v-col>
    <v-col cols="2">
      <v-rating
        v-model="compRating"
        color="amber"
        dense
        half-increments
        readonly
        size="14"
      ></v-rating>
    </v-col>
    <v-col cols="1">
      <div class="grey--text ms-4">{{ compRating }}</div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "RatingComponent",
  data() {
    return {
      compRating: this.rating + 0,
    };
  },
  props: {
    rating: Number,
    ratingType: String,
  },
};
</script>
