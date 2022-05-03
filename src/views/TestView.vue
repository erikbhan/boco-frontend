<template>
  <div />
  <rent-history :ownerHistory="ownerHistory" :renterHistory="renterHistory"/>
</template>

<script>
import RentHistory from "@/components/UserProfileComponents/RentHistoryComponents/RentHistory.vue"

export default {
  data() {
    return {
      show: false,
      ownerHistory: [{

      }],
      renterHistory: [{

      }],
    };
  },
  components: {
    RentHistory
  },
  methods: {
    toggleModal() {
      this.show = !this.show;
    },
  },
};
</script>
