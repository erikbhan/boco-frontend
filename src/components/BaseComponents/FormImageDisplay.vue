<template>
  <img
    :src="image"
    class="w-2/5 inline"
    alt="Bilde av gjenstanden"
    @click="toggleModal"
  />
  <custom-footer-modal
    @close="toggleModal"
    :message="'Bilder som fjernes kan ikke lastes opp på nytt uten å laste opp et annet bilde først.'"
    :title="'Er du sikker på at du vil fjene bilde?'"
    :visible="show"
  >
    <div class="flex justify-center p-2">
      <colored-button :text="'Avbryt'" @click="toggleModal" class="m-2" />
      <colored-button :text="'Slett'" @click="removeImage" class="m-2" />
    </div>
  </custom-footer-modal>
</template>

<script>
import ColoredButton from "@/components/BaseComponents/ColoredButton";
import CustomFooterModal from "@/components/BaseComponents/CustomFooterModal.vue";

export default {
  components: {
    ColoredButton,
    CustomFooterModal,
  },
  data() {
    return {
      show: false,
    };
  },
  props: {
    image: String,
  },
  methods: {
    removeImage() {
      this.$emit("remove");
    },
    toggleModal() {
      this.show = !this.show;
    },
  },
};
</script>
