<template>
  <v-card max-width="40%" class="text-left ma-5 pa-2">
    <v-img
      class="rounded-5"
      :src="item.img || require('../assets/default-product.png')"
    ></v-img>

    <v-card-subtitle>{{ item.adresse }}</v-card-subtitle>

    <v-card-text class="font-weight-bold mb-n3 mt-n3">
      {{ item.title }}
    </v-card-text>

    <v-card-subtitle>{{ item.price }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "ItemCard.vue",
  data() {
    return {
      item: {
        img: "",
        adresse: "adresse",
        title: "Tittel",
        price: "pris kr",
      },
    };
  },
};
</script>
