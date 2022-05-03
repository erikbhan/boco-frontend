<template>
  <div v-if="loading">LASTER...</div>
  <ul v-else>
    <li v-for="member in members" :key="member.userId">
      <UserListItemCard :buttons="buttons" :user="member" />
    </li>
  </ul>
</template>

<script>
import UserListItemCard from "@/components/UserProfileComponents/UserListItemCard.vue";
import CommunityService from "@/services/community.service";

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
      loading: false,
    };
  },
  methods: {
    async load() {},
  },
  async created() {
    this.loading = true;
    this.members = await CommunityService.getCommunityMembers(
      this.$route.params.communityID
    );
    this.loading = false;
  },
};
</script>
