<template>
  <div >
    <button @click="toggleModal">Hello</button>
    <RatingModal
        @close="this.show = false"
        :visible=show
        :name="'Test Testesnes'"
        :title="'Hammer '"
    ></RatingModal>
  </div>
</template>

<script>
import RatingModal from "@/components/BaseComponents/RatingModal";
export default {
  data() {
    return {
      show: false,
    };
  },
  components: {
    RatingModal,
  },
  methods: {
    toggleModal() {
      this.show = !this.show;
    },
  },
};
</script>
