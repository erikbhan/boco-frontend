<template>
  <div class="mt-5">
    <div
      class="w-[80%] h-full rounded bg-gray-200 overflow-hidden display:inline-block correct-size"
    >
      <div class="relative h-0 pb-[66%]">
        <img
          class="w-full h-full absolute inset-0"
          :src="item.img || require('../../assets/default-product.png')"
          alt="Item image"
        />
      </div>
      <div class="p-1 m-1 bottom-0">
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
