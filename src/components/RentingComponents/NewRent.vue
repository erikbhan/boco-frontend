<template>
  <div id="confirmationBox">
    <div id="rentTitle">
      <h1>
        {{ title }}
      </h1>
    </div>

    <div id="fromTime">
      <p>Fra: {{ fromTimeString }}</p>
    </div>
    <div id="toTime">
      <p>Til: {{ toTimeString }}</p>
    </div>
    <div id="price">
      <p>Totaltpris: {{ price }} kr</p>
    </div>
    <div id="message">
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
    <button id="cancelButton" class="text-primary-medium">Tilbake</button>
    <div id="confirmButton">
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
      fromTimeString: "",
      toTime: this.newRentBox.toTime,
      toTimeString: "",
      fromTimeMilliseconds: new Date(this.newRentBox.fromTime).valueOf(),
      toTimeMilliseconds: new Date(this.newRentBox.toTime).valueOf(),
      message: "",
      price: this.newRentBox.price,
    };
  },
  props: {
    newRentBox: {
      renterId: Number,
      title: String,
      description: String,
      fromTime: Date,
      toTime: Date,
      listingId: Number,
      isAccepted: Boolean,
      price: Number,
    },
  },
  created() {
    this.fromTimeString = this.convertDates(this.fromTime);
    this.toTimeString = this.convertDates(this.toTime);
  },

  methods: {
    convertDates(date) {
      const dateCopy = new Date(date);
      const dateDate = dateCopy.getDate();
      const dateMonth = dateCopy.getMonth();
      let monthString = "";
      switch (dateMonth) {
        case 1:
          monthString = "Januar";
          break;
        case 2:
          monthString = "Februar";
          break;
        case 3:
          monthString = "Mars";
          break;
        case 4:
          monthString = "April";
          break;
        case 5:
          monthString = "Mai";
          break;
        case 6:
          monthString = "Juni";
          break;
        case 7:
          monthString = "Juli";
          break;
        case 8:
          monthString = "August";
          break;
        case 9:
          monthString = "September";
          break;
        case 10:
          monthString = "Oktober";
          break;
        case 11:
          monthString = "November";
          break;
        case 12:
          monthString = "Desember";
          break;
        default:
          monthString = "Noe feil";
          break;
      }
      const dateYear = dateCopy.getFullYear();
      return dateDate + ". " + monthString + " " + dateYear;
    },
    cancelRent() {
      console.log;
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
#confirmationBox {
  border: 1px solid silver;
  margin-top: 60fr;
  padding: 10%;
  width: 80%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 0.5fr 1.5fr 0.7fr 0.7fr 0.7fr 3fr 1fr;
  /* max-height: 100%; */
  margin-top: 10%;
}
#cancelButton {
  grid-column: 1/2;
  grid-row: 1/2;
}
#rentTitle {
  margin-top: 10%;
  text-align: center;
  grid-column: 1/3;
  grid-row: 2/3;
  font-weight: bold;
}
#fromTime {
  grid-row: 3/4;
  grid-column: 1/3;
  display: block;
}
#toTime {
  grid-row: 4/5;
  grid-column: 1/3;
  display: block;
}
#price {
  grid-row: 5/6;
  grid-column: 1/3;
}
#message {
  grid-column: 1/3;
  grid-row: 6/7;
}
#confirmButton {
  grid-column: 1/3;
  grid-row: 7/8;
  align-content: center;
  margin: auto;
  margin-top: 10px;
}
</style>
