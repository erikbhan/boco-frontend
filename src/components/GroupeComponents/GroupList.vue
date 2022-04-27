<template>
  <ul>
    <li v-for="(group, index) in groupList" :key="index">
      <group-list-item :group="group" />
    </li>
  </ul>
</template>

<script>
import GroupListItem from "@/components/GroupeComponents/GroupListItem.vue";

export default {
  name: "GroupList",
  props: {
    groupList: Array,
  },
  components: {
    GroupListItem,
  },
};
</script>
