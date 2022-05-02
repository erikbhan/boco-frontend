<template>
  <div class="confirmationBox">
    <div class="rentTitle">
      <h1>
        {{ title }}
      </h1>
    </div>

    <div class="fromTime">
      <p>Fra: {{ fromTime }}</p>
    </div>
    <div class="toTime">
      <p>Til: {{ toTime }}</p>
    </div>
    <div class="message">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        id="descriptionLabel"
        >Skriv en melding til utleier:</label
      >
      <textarea
        id="description"
        rows="4"
        v-model="message"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      ></textarea>
    </div>
    <button class="cancelButton">Tilbake</button>
    <div class="confirmButton">
      <colored-button @click="sendRent" :text="'Send'"></colored-button>
    </div>
  </div>
</template>

<script>
import ColoredButton from "@/components/BaseComponents/ColoredButton.vue";
import { postNewRent } from "@/utils/apiutil";
export default {
  name: "NewRent",
  components: {
    ColoredButton,
  },
  data() {
    return {
      title: this.newRentBox.title,
      fromTime: this.newRentBox.fromTime,
      toTime: this.newRentBox.toTime,
      fromTimeMilliseconds: new Date(this.newRentBox.fromTime).valueOf(),
      toTimeMilliseconds: new Date(this.newRentBox.toTime).valueOf(),
      message: "",
      price: this.newRentBox.price_per_day,
    };
  },
  props: {
    newRentBox: {
      renterId: Number,
      title: String,
      description: String,
      fromTime: Date,
      toTime: Date,
      pricePerDay: Number,
      listingId: Number,
      isAccepted: Boolean,
    },
  },
  methods: {
    cancelRent() {
      console.log("Canceled");
    },
    sendRent: async function () {
      const rent = {
        message: this.message,
        listingId: this.newRentBox.listingId,
        renterId: this.newRentBox.renterId,
        isAccepted: false,
        toTime: this.toTimeMilliseconds,
        fromTime: this.fromTimeMilliseconds,  
      };
      
      await postNewRent(rent);
      console.log(rent);
    },
  },
};
</script>

<style scoped>
.confirmationBox {
  border: 1px solid silver;
  margin-top: 60fr;
  padding: 10%;
  width: 80%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 0.5fr 1.5fr 1fr 1fr 3fr 1fr;
  /* max-height: 100%; */
  margin-top: 10%;
}
.cancelButton {
  grid-column: 1/2;
  grid-row: 1/2;
}
.rentTitle {
  margin-top: 10%;
  text-align: center;
  grid-column: 1/3;
  grid-row: 2/3;
  font-weight: bold;
}
.fromTime {
  grid-row: 3/4;
  grid-column: 1/3;
  display: block;
}
.toTime {
  grid-row: 4/5;
  grid-column: 1/3;
  display: block;
}

.message {
  grid-column: 1/3;
  grid-row: 5/6;
}
.confirmButton {
  grid-column: 1/3;
  grid-row: 6/7;
  align-content: center;
  margin: auto;
  margin-top: 10px;
}
</style>
