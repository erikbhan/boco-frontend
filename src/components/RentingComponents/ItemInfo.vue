<template>
  <div class="drop-shadow">HEY</div>
  <div>
      <div> 
        {{ item.title }} 
      </div>
      <div>
          Beskrivelse: {{ item.description }}
      </div>
      <div>
          Adressen er: {{ item.address }}
      </div>
      <div>
          Pris per dag er: {{ item.pricePerDay }}
      </div>
      <div>
          <!-- Add in method for displaying user card. Use item.userID on the method -->
      </div>
      <div>
          <!-- Add calculate method. Use amount of time * pricePerDay. Display this here. -->
          <p>Totalprisen er: mye (Change with tot price from calc method)</p>
          <button>
            <!-- This button should send you to the rent page -->
            Rent page
          </button>
      </div>
  </div>
</template>

<script>
import { getItem } from "@/utils/apiutil";

export default {
    name: "ItemInfo",
    data() {
        return {
            item: {
            listingID: 0,
            title: "",
            description: "",
            pricePerDay: 0,
            address: "",
            userID: 0,
            categoryNames: [],
            communityIDs: [],
            },
        };
    },
    methods: {
        async getItem() {
            let id = this.$router.currentRoute.value.params.id;
            this.item = await getItem(id);
        },
    },
    beforeMount() {
        this.getItem();
    },
};
</script>

<style></style>
