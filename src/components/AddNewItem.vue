<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-col align="center" justify="space-around">
      <p class="text-h5 ma-5">Utleie</p>
    </v-col>

    <v-container fluid>
      <p>Leie</p>
      <v-radio-group
        v-model="radios"
        :rules="[(v) => !!v || 'Velg en utleietype']"
        required
      >
        <v-radio label="Dags" value="rentForDays" v-model="radios"></v-radio>
        <v-radio label="Time" value="rentForHours" v-model="radios"></v-radio>
        <v-radio label="Begge" value="rentBothTypes" v-model="radios"></v-radio>
      </v-radio-group>

      <v-text-field
        v-model="item.title"
        :rules="titleRules"
        label="Overskrift"
        required
      ></v-text-field>

      <v-select
        v-model="select"
        :items="items"
        label="Category"
        :rules="[(v) => !!v || 'Kategori må velges']"
        required
      ></v-select>

      <v-textarea
        v-model="item.description"
        :rules="descriptionRules"
        label="Beskrivelse"
      ></v-textarea>

      <v-text-field
        v-model="item.price"
        :rules="priceRules"
        label="Pris"
        type="number"
        required
      ></v-text-field>

      <v-col class="mb-5">
        <p>Bilder</p>
      </v-col>

      <input
        type="file"
        ref="file"
        style="display: none"
        @change="previewFiles"
        multiple
      />

      <v-btn @click="$refs.file.click()">Nytt bilde</v-btn>

      <v-img
        v-for="image in item.images"
        :key="image"
        :src="image"
        width="40%"
        height="100px"
        class="ma-2"
      >
      </v-img>
    </v-container>

    <v-col align="center" justify="space-around">
      <v-btn class="mr-4" @click="saveClicked"> Lagre </v-btn>
    </v-col>
  </v-form>
</template>

<script>
export default {
  name: "AddNewItem.vue",

  data() {
    return {
      valid: true,
      item: {
        title: "",
        description: "",
        price: "",
        category: "",
        type: "",
        images: [],
      },
      select: null,
      items: ["Hage", "Kjøkken", "Musikk", "Annet"],
      radios: null,

      titleRules: [
        (v) => !!v || "Overskrift mangler",
        (v) =>
          (v && v.length <= 32) || "Overskrift må være mindre enn 32 bokstaver",
      ],
      descriptionRules: [
        (v) => !!v || "Beskrivelse mangler",
        (v) =>
          (v && v.length <= 50) ||
          "Beskrivelse kan ikke vøre større enn 200 tegn",
      ],
      priceRules: [
        (v) =>
          !!v ||
          "Pris mangler, skriv inn 0 hvis produktet skal leies ut gratis",
        (v) =>
          (v && v <= 50000) || "Du kan ikke leie ut noe for mer enn 10,000 kr",
      ],
      selectRules: [(v) => !!v || "Ingen kategori valgt"],
    };
  },
  methods: {
    async saveClicked() {
      console.log("Attempting to save item");

      await this.$refs.form.validate().then(
        function (response) {
          this.valid = response.valid;
          console.log("valid " + this.valid);
        }.bind(this)
      );

      if (this.valid === false) {
        console.log("Alle felt er ikke valid");
        this.valid = true;
        return;
      }
      console.log("videre");

      console.log("Type leie: " + this.item.radios);
      console.log("Tittel: " + this.item.title);
      console.log("Kategori: " + this.select);
      console.log("Beskrivelse: " + this.item.description);
      console.log("Pris: " + this.item.price);
      console.log("bilder: " + this.item.images);
    },
    addNewImage: function () {},
    previewFiles: function (event) {
      console.log(event.target.files);
      //this.item.images.push(event.target.files[0]);
      this.item.images.push(URL.createObjectURL(event.target.files[0]));
    },
  },
};
</script>
