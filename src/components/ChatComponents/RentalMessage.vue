<template>
  <div class="message" style="max-width: 70%">
    <div class="info">
      <div class="text">
        <h2 class="header">Ny utleie forespørsel</h2>
        <p>Dato: {{ from }} - {{ to }}</p>
        <p>Pris: {{ price }}kr</p>
      </div>
      <div class="img-container">
        <img class="img" :src="img" alt="Produkt Bilde" />
      </div>
    </div>
    <div>
      <p class="more-header">Melding fra leier:</p>
      <div class="more">
        <p>
          {{ extra }}
        </p>
      </div>
    </div>
    <div class="buttons" v-if="!rent.isAccepted && !rent.deleted">
      <button class="button green" @click="accept">Godta</button>
      <button class="button red" @click="reject">Avslå</button>
    </div>
    <div class="" v-if="rent.isAccepted">
      <h1 class="green">Godtatt</h1>
    </div>
    <div class="" v-if="rent.deleted">
      <h1 class="red">Avslått</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { tokenHeader } from "@/utils/token-utils";
export default {
  props: {
    rent: {
      type: Object,
      required: true,
    },
  },
  computed: {
    img() {
      return "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"; //this.rent.listing.imageUrl;
    },
    from() {
      // take ms and turn into date and return date
      return new Date(this.rent.fromTime).toLocaleDateString();
    },
    to() {
      return new Date(this.rent.toTime).toLocaleDateString();
    },
    price() {
      // Calculate price from price * days
      return (
        this.rent.listing.pricePerDay *
        Math.ceil(
          (this.rent.toTime - this.rent.fromTime) / (1000 * 60 * 60 * 24)
        )
      );
    },
    extra() {
      return this.rent.message || "Ingen Melding";
    },
  },
  methods: {
    async accept() {
      await axios.put(
        process.env.VUE_APP_BASEURL + `renting/${this.rent.rentId}/accept`,
        null,
        { headers: tokenHeader() }
      );
    },
    async reject() {
      await axios.delete(
        process.env.VUE_APP_BASEURL + `renting/${this.rent.rentId}/delete`,
        null,
        { headers: tokenHeader() }
      );
    },
  },
};
</script>

<style scoped>
.message {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #d1d5db;
  border-radius: 10px;
  padding: 10px;
}

.info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  max-height: 200px;
}

.text h1 {
  text-decoration: underline;
}

@media (max-width: 1200px) {
  .img-container {
    max-width: 30%;
  }
  .text {
    min-width: 70%;
  }
}

.img-container {
  display: flex;
  align-content: center;
  justify-items: center;
  max-height: 20%;
}
.header {
  font-weight: bold;
  text-align: center;
  text-decoration: underline;
}
.more-header {
  font-weight: bold;
}

.more {
  border: 1px solid black;
  border-radius: 10px;
}

.more p {
  margin-left: 5px;
}

.buttons {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  justify-content: space-around;
}

.button {
  border-radius: 0.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-weight: 700;
  color: white;
}

.red {
  background-color: #ff1f1f;
}

.red:hover {
  box-shadow: 0 0 0 0.2rem rgba(255, 31, 31, 0.5);
}

.green {
  background-color: #0bb610;
}
.green:hover {
  box-shadow: 0 0 0 0.2rem rgba(11, 182, 16, 0.5);
}
</style>
