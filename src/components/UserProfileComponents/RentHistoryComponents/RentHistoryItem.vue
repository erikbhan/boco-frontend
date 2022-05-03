<template>
  <div
    class="bg-white shadow dark:bg-gray-800 select-none cursor-pointer hover:bg-gray-50"
  >
    <p class="font-bold mx-4" id="title">
      {{ historyItem.listing.title }}
    </p>
    <div class="flex flex-row items-center">
      <div class="flex flex-col px-4 flex-1">
        <router-link :to="{ path: '/profile/' + user.accountId }">
          Leid til: {{ user.firstName }} {{ user.lastName }}
        </router-link>
      </div>
      <div class="flex flex-col flex-1">
        <div>
          Fra:
          {{ this.getDateString(historyItem.fromTime, isMultipleDays) }}
        </div>
        <div>
          Til: {{ this.getDateString(historyItem.toTime, isMultipleDays) }}
        </div>
      </div>
      <colored-button :text="'Vurder'" class="px-4 flex-1" />
    </div>
  </div>
</template>

<script>
import ColoredButton from "@/components/BaseComponents/ColoredButton.vue";
import { getUser } from "@/utils/apiutil";
import { parseCurrentUser } from "@/utils/token-utils";

export default {
  name: "RentHistoryItem",
  components: {
    ColoredButton,
  },
  data() {
    return {
      user: {},
    };
  },
  props: {
    historyItem: {
      rentId: Number,
      fromTime: Number,
      toTime: Number,
      isAccepted: Boolean,
      listing: {
        listingID: Number,
        title: String,
        pricePerDay: Number,
        address: String,
        userID: Number,
      },
      renterId: Number,
    },
  },
  computed: {
    currentUser() {
      return parseCurrentUser();
    },
    isMultipleDays() {
      if (this.historyItem.toTime - this.historyItem.fromTime < 86400000) {
        return false;
      }
      return true;
    },
    price() {
      if (this.isMultipleDays) {
        let numDays = Math.round(
          (this.historyItem.toTime - this.historyItem.fromTime) / 86400000
        );
        return this.historyItem.listing.pricePerDay * numDays;
      }
      return this.historyItem.listing.pricePerDay;
    },
  },
  methods: {
    getDateString(milliseconds) {
      let today = new Date();
      let date = new Date(milliseconds);
      let dateString = date.getDate() + "." + date.getMonth();

      if (date.getFullYear() != today.getFullYear()) {
        dateString += "." + date.getFullYear();
      }
      return dateString;
    },
    async getUser(historyItem) {
      if (this.isCurrentUser(historyItem.renterId)) {
        this.user = await getUser(historyItem.listing.userID);
      }
      if (this.isCurrentUser(historyItem.listing.userID)) {
        this.user = await getUser(historyItem.renterId);
      }
    },
    isCurrentUser(id) {
      return id == this.currentUser.accountId;
    },
  },
  beforeMount() {
    this.getUser(this.historyItem);
    console.log(this.user);
  },
};
</script>
