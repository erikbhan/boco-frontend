<template>
  <div>
    <div id="myGroups">
      <div>Mine grupper:</div>
      <group-list :groupList="myGroups" />
    </div>
    <div id="localGroups">
      <div>Offentlige grupper:</div>
      <group-list :groupList="localGroups" />
    </div>
  </div>
</template>

<script>
import GroupList from "@/components/CommunityComponents/CommunityList.vue";
import { getMyGroups, getVisibleGroups } from "@/utils/apiutil";

export default {
  name: "HomeView",
  data() {
    return {
      myGroups: [],
      localGroups: [],
    };
  },
  components: {
    GroupList,
  },
  methods: {
    async getMyGroups() {
      this.myGroups = await getMyGroups();
    },
    async getPotentialGroups() {
      this.localGroups = await getVisibleGroups();
    },
  },
  async created() {
    await this.getMyGroups();
    await this.getPotentialGroups();
  },
};
</script>
