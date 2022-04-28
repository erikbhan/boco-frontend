<template>
  <div>
    <div id="myGroups">
      <div>Mine grupper:</div>
      <group-list :groupList="myGroups" />
    </div>
  </div>
</template>

<script>
import GroupList from "@/components/CommunityComponents/CommunityList.vue";
import { getMyGroups } from "@/utils/apiutil";

export default {
  data() {
    return {
      myGroups: [],
    };
  },
  components: {
    GroupList,
  },
  methods: {
    async getMyGroups() {
      this.myGroups = await getMyGroups();
    },
  },
  beforeMount() {
    this.getMyGroups();
  },
};
</script>
