<template>
  <div v-if="totalPages() > 0">
    <span
      v-if="showPreviousLink()"
      class="cursor-pointer inline-flex items-center p-2 text-sm font-medium text-primary-light bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
      @click="updatePage(currentPage - 1)"
    >
      Forrige
    </span>
    <label class="mx-2">{{ currentPage + 1 }} av {{ totalPages() }}</label>
    <span
      v-if="showNextLink()"
      class="cursor-pointer inline-flex items-center p-2 text-sm font-medium text-primary-light bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
      @click="updatePage(currentPage + 1)"
    >
      Neste
    </span>
  </div>
</template>

<script>
export default {
  name: "paginationTemplate",
  props: ["items", "currentPage", "pageSize"],
  methods: {
    updatePage(pageNumber) {
      this.$emit("page:update", pageNumber);
    },
    totalPages() {
      return Math.ceil(this.items.length / this.pageSize);
    },
    showPreviousLink() {
      return this.currentPage == 0 ? false : true;
    },
    showNextLink() {
      return this.currentPage == this.totalPages() - 1 ? false : true;
    },
  },
};
</script>
