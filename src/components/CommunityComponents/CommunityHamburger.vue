<template>
  <div
    id="dropdown"
    class="z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
  >
    <ul class="py-1">
      <li id="newItem">
        <router-link
          to="/newItem"
          class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >Opprett Utleie</router-link
        >
      </li>
      <li id="getMembers">
        <router-link
          :to="'/community/' + communityID + '/memberlist'"
          class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >Se Medlemmer
        </router-link>
      </li>
      <li id="adminGroup" v-if="admin">
        <router-link
          :to="'/community/' + communityID + '/admin'"
          class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >Administrer Gruppe</router-link
        >
      </li>
      <li id="leaveGroup">
        <div
          class="cursor-pointer block py-2 px-4 text-sm text-error hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          @click="leaveCommunity"
        >
          Forlat Gruppe
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import { LeaveCommunity } from "@/utils/apiutil";

export default {
  name: "CommunityHamburger",
  props: {
    communityID: Number,
    admin: Boolean,
  },
  data(){
    return{
      id: -1,
    }
  },

  methods:{
    leaveCommunity: async function(){
      this.id = await this.$router.currentRoute.value.params.communityID;
      await LeaveCommunity(this.id);
      this.$router.push('/');
    }
  }
};
</script>
