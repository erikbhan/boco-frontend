<template>
  <ul>
    <li v-for="community in communities" :key="community">
      <CommunityListItem :community="community" :member="member" />
    </li>
  </ul>
</template>

<script>
import CommunityListItem from "@/components/CommunityComponents/CommunityListItem.vue";
//import Join

export default {
  name: "CommunityList",
  props: {
    communities: Array,
    member: Boolean,
  },
  components: {
    CommunityListItem,
  },
};
</script>
