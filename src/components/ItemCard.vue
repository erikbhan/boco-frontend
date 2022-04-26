<template>
  <div class="mt-5">
    <div class="w-4/5 rounded bg-gray-200">
      <img
        class="w-full"
        :src="item.img || require('../assets/default-product.png')"
        alt="Item image"
      />
      <div class="p-1 m-1">
        <p class="text-gray-700 text-xs font-bold" id="adress">
          {{ item.adresse }}
        </p>
        <p class="font-bold text-sm" id="title">{{ item.title }}</p>
        <p class="text-gray-700 text-xs" id="price">{{ item.price }} kr</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      img: String,
      adresse: String,
      title: String,
      price: Number,
    },
  },
};
</script>
