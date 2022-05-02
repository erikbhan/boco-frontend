<template>
  <CommunityHeader
    :admin-status="false"
    :community="community"
    class="mb-5 mt-5"
  />
  <ul>
    <li v-for="member in memberlist" :key="member.userId">
      <user-list-item-card :admin="admin" :user="member" />
    </li>
  </ul>
</template>

<script>
import UserListItemCard from "../UserProfileComponents/UserListItemCard.vue";
import { GetMembersOfCommunity, GetCommunity } from "@/utils/apiutil";
import CommunityHeader from "@/components/BaseComponents/CommunityHeader";

export default {
  data() {
    return {
      memberlist: [],
      community: {},
    };
  },
  components: {
    CommunityHeader,
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
