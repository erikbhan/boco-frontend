<template>
  <div class="flex items-center justify-between mx-4">
    <div class="flex-1 min-w-0">
      <h2
        class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
      >
        {{ groupe.name }}
      </h2>
      <div
        class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6"
      >
        <div class="mt-2 flex items-center text-sm text-gray-500">
          <svg
            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          {{ groupe.address }}
        </div>
      </div>
    </div>
    <div class="flex">
      <span class="hidden sm:block">
        <button
          v-if="adminStatus"
          @click="edit()"
          type="button"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <!-- Heroicon name: solid/pencil -->
          <svg
            class="-ml-1 mr-2 h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            />
          </svg>
          Edit
        </button>
      </span>
    </div>
  </div>
  <div class="h-screen bg-gray-200 content-top grid place-items-top">
    <member-list :admin="editing" />
  </div>
</template>

<script>
import MemberList from "@/components/CommunityComponents/MemberList.vue";

export default {
  data() {
    return {
      groupe: {
        name: "Solsikken borettslag",
        address: "Sollia 6, 7033 Trondheim",
      },
      adminStatus: false,
      editing: false,
    };
  },
  components: {
    MemberList,
  },
  methods: {
    edit() {
      this.editing = !this.editing;
    },
  },
};
</script>
