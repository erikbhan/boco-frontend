<template>
  <div class="grid place-content-center h-48">
    <IconButton
      @click="deleteCommunity"
      :buttonColor="'red'"
      :text="'Slett felleskap'"
    />
  </div>
</template>

<script>
import CommunityAdminService from "@/services/community-admin.service";
import IconButton from "@/components/BaseComponents/IconButton.vue";

//TODO: OPEN CONFIRMATION DIALOG WHEN DELETING

export default {
  components: {
    IconButton,
  },
  methods: {
    deleteCommunity() {
      CommunityAdminService.deleteCommunity(this.$route.params.communityID);
    },
  },
};
</script>
