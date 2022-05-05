<template>
  <button
    id="dropdownDefault"
    data-dropdown-toggle="dropdown"
    class="w-10 h-10 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg float-right text-sm p-1.5"
    type="button"
  >
    <svg
      class="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
      ></path>
    </svg>
  </button>
</template>
<script>
export default {
  name: "TripleDotButton",
};
</script>
