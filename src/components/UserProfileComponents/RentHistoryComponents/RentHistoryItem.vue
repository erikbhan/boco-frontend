<template>
  <div class="mt-5">
    <div class="w-4/5 rounded bg-gray-200">
      <img
        class="w-full"
        :src="listing.img || require('../assets/default-product.png')"
        alt="Item image"
      />
      <div class="p-1 m-1">
        <p class="font-bold text-sm" id="title">{{ listing.title }}</p>
        <p class="text-gray-700 text-xs" id="price">{{ price }} kr</p>
        <div>Leid til:</div>
        <router-link :to="{ path: '/' + historyItem.rentedBy.id }">
          {{ renter }}
        </router-link>
        <div>Leid fra:</div>
        <router-link
          :to="{ path: '/' + historyItem.rentedFrom.id }"
          class="text-left pa-2"
        >
          {{ owner }}
        </router-link>
        <div>
          Fra:
          {{ this.getDateString(historyItem.fromTime, isMultipleDays) }}
        </div>
        <div>
          Til: {{ this.getDateString(historyItem.toTime, isMultipleDays) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseCurrentUser } from '@/utils/token-utils';

export default {
  name: "RentHistoryItem",
  props: {
    historyItem: {
      rentId: Number,
      fromTime: Date,
      toTime: Date,
      listingId: Number,
      renterId: Number,
      accepted: Boolean,
    },
  },
  computed: {
    currentUser() {
      return parseCurrentUser();
    },
    isMultipleDays() {
      if (this.agreement.toTime - this.agreement.fromTime < 86400000) {
        return false;
      }
      return true;
    },
    price() {
      if (this.isMultipleDays) {
        let numDays = Math.round(
          (this.agreement.toTime - this.agreement.fromTime) / 86400000
        );
        return this.listing.pricePerDay * numDays;
      }
      return this.listing.pricePerDay;
    },
    isRenter(historyItem) {
      return historyItem.renterId == currentUserId;
    },
  },
  methods: {
    getDateString(date, isMultipleDays) {
      let today = new Date();
      let dateString = date.getDate() + "." + date.getMonth();

      if (date.getFullYear() != today.getFullYear()) {
        dateString += "." + date.getFullYear();
      }

      if (isMultipleDays) {
        return dateString;
      }

      dateString += " " + date.getHours() + ":" + date.getMinutes();
    },
  },
};
</script>
