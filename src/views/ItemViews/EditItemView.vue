<template>
  <div class="h-screen grid md:mt-8">
    <edit-item-form :initialItem="initialItem" :communities="communities" />
  </div>
</template>

<script>
import EditItemForm from "@/components/ItemComponents/EditItemForm.vue";

export default {
  name: "EditItemView",
  components: {
    EditItemForm,
  },
};
</script>
