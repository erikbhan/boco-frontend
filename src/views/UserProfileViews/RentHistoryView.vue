<template>
  <ul>
    <li v-for="historyItem in fullHistory" :key="historyItem.rentId">
      <rent-history-item :historyItem="historyItem" />
    </li>
  </ul>
</template>

<script>
import RentHistoryItem from "@/components/UserProfileComponents/RentHistoryComponents/RentHistoryItem.vue";
import UserService from "@/services/user.service"

export default {
  components: {
    RentHistoryItem,
  },
  data() {
    return {
      renterHistory: [],
      ownerHistory: [],
    }
  },
  computed: {
    fullHistory() {
      function compareHistoryItems(itemA, itemB) {
        if (itemA.fromTime < itemB.fromTime) {
          return -1;
        }
        if (itemA.fromTime > itemB.fromTime) {
          return 1;
        }
        return 0;
      }

      let fullHistory = this.renterHistory.concat(this.ownerHistory);
      fullHistory.filter((item) => item.isAccepted);
      fullHistory.sort(compareHistoryItems);
      return fullHistory;
    },
  },
  methods: {
    getHistories() {
      this.renterHistory = UserService.getRenterHistory();
      this.ownerHistory = UserService.getOwnerHistory();
    }
  },
  beforeMount() {
    this.getHistories()
  },
};
</script>
