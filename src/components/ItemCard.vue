<template>
  <div class="flex justify-center mt-5">
    <div class="w-2/5 rounded overflow-hidden bg-gray-100">
      <img
        class="w-full"
        :src="item.img || require('../assets/default-product.png')"
        alt="Item image"
      />
      <div class="p-1 m-1">
        <p class="text-gray-700 text-xs" id="adress">
          {{ item.adresse }}
        </p>
        <p class="font-bold text-sm" id="title">{{ item.title }}</p>
        <p class="text-gray-700 text-xs" id="price">
          {{ item.price }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
