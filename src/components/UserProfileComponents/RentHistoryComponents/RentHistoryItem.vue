<template>
  <div
    class="bg-white shadow dark:bg-gray-800 select-none cursor-pointer hover:bg-gray-50"
  >
    <p class="font-bold mx-4" id="title">
      {{ historyItem.listing.title }}
    </p>
    <div class="flex flex-row items-center">
      <div class="flex flex-col px-4 flex-1">
        <router-link :to="{ path: '/profile/' + user.userId }">
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
      <colored-button
          v-if="!isRated"
        :text="'Vurder'"
        class="px-4 flex-1"
        @click="
          $emit('rate', {
            show: true,
            name: user.firstName + ' ' + user.lastName,
            title: historyItem.listing.title,
            rentID: historyItem.rentId,
            renterIsReceiverOfRating: !currentUserIsRenter,
          })
        "
      />
    </div>
  </div>
</template>

<script>
import ColoredButton from "@/components/BaseComponents/ColoredButton.vue";
import { parseCurrentUser } from "@/utils/token-utils";
import userService from "@/services/user.service";

export default {
  name: "RentHistoryItem",
  components: {
    ColoredButton,
  },
  data() {
    return {
      user: {},
      isRated: true,
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
    currentUserIsRenter() {
      return this.isCurrentUser(this.historyItem.renterId);
    },
  },
  methods: {
    getDateString(milliseconds) {
      let today = new Date();
      let date = new Date(milliseconds);
      let dateString = date.getDate() + "." + (date.getMonth()+1);

      if (date.getFullYear() != today.getFullYear()) {
        dateString += "." + date.getFullYear();
      }
      return dateString;
    },
    isCurrentUser(id) {
      return id == this.currentUser.accountId;
    },
  },
  async beforeCreate() {
    if (this.currentUserIsRenter) {
      this.user = await userService.getUserFromId(
        this.historyItem.listing.userID
      );
    } else {
      this.user = await userService.getUserFromId(this.historyItem.renterId);
    }
    this.isRated = await userService.isRated(this.historyItem.rentId);

  },
};
</script>
