<template>
  <div
    class="bg-white shadow dark:bg-gray-800 select-none cursor-pointer hover:bg-gray-50 flex items-center p-4"
  >
    <div class="h-10 w-10 flex flex-col justify-center items-center mr-4">
      <img alt="groupIMG" src="../../assets/group.png" />
    </div>
    <div class="flex-1 pl-1">
      <div class="font-medium dark:text-white">
        {{ group.name }}
      </div>
    </div>
    <div class="flex flex-row justify-center">
      <button
        @click="goToJoin(group.communityId)"
        v-if="!isMember"
        class="px-4 py-2 w-24 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      >
        Bli med
      </button>
      <button
        v-if="isMember"
        @click="goToGroup(group.communityId)"
        class="px-4 py-2 w-24 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      >
        Gå til
      </button>
    </div>
  </div>
</template>

<script>
import { getMyGroups } from "@/utils/apiutil";

export default {
  name: "GroupListItem",
  data() {
    return {
      myGroups: [],
    };
  },
  props: {
    group: Object,
  },
  methods: {
    goToGroup(id) {
      this.$router.push("/community/" + id);
    },
    goToJoin(id) {
      this.$router.push("/community/" + id + "/join");
    },
    async getMyGroups() {
      this.myGroups = await getMyGroups();
    },
    isMember(group) {
      return this.myGroups.includes(group);
    },
  },
  beforeMount() {
    this.getMyGroups();
  },
};
</script>
