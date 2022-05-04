<template>
  <div>
    <div class="form-check" v-for="filter in filters" :key="filter">
      <input
          class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary-medium checked:border-primary-medium focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="flexRadioDefault"
          :value="filter"
          @change="checkRadioButton($event)"
      />
      <label
          class="form-check-label inline-block text-gray-800"
      >
        {{ filter}}
      </label>
    </div>
    <ColoredButton
      :text="'Lagre'"
      @click="saveFilter()"
      class="m-2 w-fit"
    />
  </div>

</template>

<script>
import ColoredButton from "@/components/BaseComponents/ColoredButton";
export default {
  name: "FilterComponent",
  components: {
    ColoredButton,
  },
  data(){
    return{
      radio: null,
      filters: ['Pris: lav til høy', 'Pris: høy til lav', 'Tittel: A - Å', 'Tittel: Å - A'],
    }
  },
  methods: {
    checkRadioButton: function (event){
      this.radio = event.target.value;
    },

    saveFilter: function(radio){
      console.log("Save clicked");
      //console.log(this.radio);
      radio = this.radio;
      this.$emit("filter", radio);
    }
  }
}
</script>
