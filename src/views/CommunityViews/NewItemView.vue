<template>
  <div class="h-screen grid md:mt-8">
    <AddNewItem />
  </div>
</template>

<script>
import AddNewItem from "@/components/CommunityComponents/NewItemForm";

export default {
  name: "AddNewItemView.vue",
  components: {
    AddNewItem,
  },
};
</script>

<style scoped></style>
