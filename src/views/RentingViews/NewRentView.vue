<template>
  <NewRent :newRentBox="item"> </NewRent>
</template>

<script>
import NewRent from "@/components/RentingComponents/NewRent.vue";
export default {
  name: "NewRentView.vue",
  data() {
    return {
      item: {
        renterId: 3,
        title: "Jekk til leie",
        description: "Typ transport",
        fromTime: "2022-07-26",
        toTime: "2022-08-01",
        pricePerDay: 4.0,
        listingId: 157,
      },
    };
  },
  components: {
    NewRent,
  },
};
</script>
