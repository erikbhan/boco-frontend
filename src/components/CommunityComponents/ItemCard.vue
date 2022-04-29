<template>
  <div class="mt-5">
    <div class="w-52 rounded bg-gray-200">
      <img
        class="w-full"
        :src="item.img || require('../../assets/default-product.png')"
        alt="Item image"
      />
      <div class="p-1 m-1">
        <p class="text-gray-700 text-xs font-bold" id="adress">
          {{ item.address }}
        </p>
        <p class="font-bold text-sm" id="title">{{ item.title }}</p>
        <p class="text-gray-700 text-xs" id="price">
          {{ item.pricePerDay }} kr
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      img: String,
      address: String,
      title: String,
      pricePerDay: Number,
    },
  },
};
</script>
