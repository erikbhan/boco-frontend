<template>
  <ul>
    <li v-for="member in memberlist" :key="member.userId">
      <UserListItemCard :admin="admin" :user="member" />
    </li>
  </ul>
</template>

<script>
import UserListItemCard from "../UserProfileComponents/UserListItemCard.vue";
import { GetMembersOfCommunity, GetCommunity } from "@/utils/apiutil";

export default {
  data() {
    return {
      memberlist: [],
      community: {},
    };
  },
  components: {
    UserListItemCard,
  },
  props: {
    admin: Boolean,
  },
  methods: {
    getAllMembersOfCommunity: async function () {
      this.memberlist = await GetMembersOfCommunity(
        this.$router.currentRoute.value.params.id
      );
    },
    getCommunity: async function () {
      this.community = await GetCommunity(
        this.$router.currentRoute.value.params.id
      );
    },
  },
  beforeMount() {
    this.getAllMembersOfCommunity();
    this.getCommunity();
  },
};
</script>
