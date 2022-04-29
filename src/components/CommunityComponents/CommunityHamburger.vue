<template>
  <div
      id="dropdown"
      class="z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
  >
    <ul class="py-1" >
      <li>
        <router-link
            to="/addNewItem"
            class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >Opprett utleie</router-link
        >
      </li>
      <li>
        <router-link
            :to="'/group/' + communityID + '/memberlist'"
            class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >Se Medlemmer
        </router-link>
      </li>
      <li>
        <router-link
            :to="'/group/' + communityID + '/memberlist'"
            class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >Administrer Gruppe</router-link
        >
      </li>
      <li>
        <div
            class="cursor-pointer block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          Forlat Gruppe
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CommunityHamburger",
  props: {
    communityID: Number,
  },
  beforeMount() {
    console.log("id: " + this.communityID);
  }
}
</script>

