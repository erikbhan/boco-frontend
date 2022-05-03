<template>
  <section class="relative w-full max-w-md px-5 py-4 mx-auto rounded-md">
    <div class="relative" id="searchComponent">
      <span class="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </span>

      <input
        type="text"
        id="searchInput"
        class="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        placeholder="Search"
        v-model="search"
      />
    </div>

    <div class="absolute inset-x-0 px-6 py-3 mt-4 border-2 border-slate-500">
      <div class="grid grid-cols-2">
        <rent-history-item v-for="historyItem in fullHistory" :key="historyItem.rentId" />
      </div>
    </div>
  </section>
</template>

<script>
import RentHistoryItem from "@/components/UserProfileComponents/RentHistoryComponents/RentHistoryItem.vue"

export default {
  components: {
    RentHistoryItem,
  },
  props: {
    renterHistory: [{
      rentId: Number,
      fromTime: Number,
      toTime: Number,
      isAccepted: Boolean,
      listingId: Number,
      renterId: Number,
      message: String,
    }],
    ownerHistory: [{
      rentId: Number,
      fromTime: Number,
      toTime: Number,
      isAccepted: Boolean,
      listingId: Number,
      renterId: Number,
      message: String,
    }],
  },
  computed: {
    fullHistory() {
      function compareHistoryItems(itemA, itemB) {
        if(itemA.fromTime < itemB.fromTime) {
          return -1;
        }
        if(itemA.fromTime > itemB.fromTime) {
          return 1;
        }
        return 0;
      };

      let fullHistory = renterHistory.concat(ownerHistory);
      fullHistory.filter((item) => item.isAccepted);
      fullHistory.sort(compareHistoryItems);
      return fullHistory;
    }
  },
}
</script>
