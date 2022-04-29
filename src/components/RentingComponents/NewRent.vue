<template>
  <div class="confirmationBox">
    <div>
      <h1>
        {{ title }}
      </h1>
    </div>
    <div>
      <p>{{ description }}</p>
    </div>
    <div>
    <p>Fra: {{ from_time }}</p>
    </div>
    <div>
    <p>Til: {{ to_time }}</p>
    </div>
    <div>
    <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        id="descriptionLabel"
        >Skriv en melding til utleier</label>
    <textarea
      id="description"
      rows="4"
      v-bind="message"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      required
    ></textarea>
    </div>
    <button @click="cancelRent">Avbryt</button>
    <button @click="sendRent">Send forespøsel</button>
  </div>
</template>

<script>
export default {
  name: "NewRent",
  data() {
    return {
      //   title: "Objekt",
      //   from_time: "2022-04-03",
      //   to_time: "2022-04-10",
      message: ""
    };
  },
  props: {
    newRentBox: {
      title: String,
      description: String,
      from_time: Date,
      to_time: Date,
    },
  },
  methods: {
    cancelRent() {
      console.log("Canceled");
    },
    sendRent: function () {
      console.log(this.message);
    },
  },
};
</script>

<style></style>
