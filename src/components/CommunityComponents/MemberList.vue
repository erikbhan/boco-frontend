<template>
  <ul>
    <li v-for="member in members" :key="member.userId">
      <UserListItemCard :buttons="buttons" :user="member" />
    </li>
  </ul>
</template>

<script>
import UserListItemCard from "../UserProfileComponents/UserListItemCard.vue";
import { GetMembersOfCommunity } from "@/utils/apiutil";

export default {
  name: "MemberList",
  components: {
    UserListItemCard,
  },
  props: {
    buttons: Array,
  },
  data() {
    return {
      members: [],
    };
  },
  async created() {
    this.members = await GetMembersOfCommunity(this.$route.params.communityID);
  },
};
</script>
