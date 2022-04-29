<template>
  <CommunityHeader
    :admin-status="false"
    :community="community"
    class="mb-5 mt-5"
  />
  <MemberList />
</template>

<script>
import CommunityHeader from "@/components/BaseComponents/CommunityHeader";
import MemberList from "@/components/CommunityComponents/MemberList.vue";

export default {
  components: {
    CommunityHeader,
    MemberList,
  },
};
</script>
