<template>
  <ul>
    <li v-for="community in communities" :key="community">
      <CommunityListItem
        :community="community"
        :member="member"
        class="border-black"
      />
    </li>
  </ul>
</template>

<script>
import CommunityListItem from "@/components/CommunityComponents/CommunityListItem.vue";

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
