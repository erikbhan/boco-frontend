<template>
  <!-- My communities, with pagination -->
  <div class="flex flex-row p-4 relative">
    <div class="text-xl md:text-2xl text-primary-light font-medium w-full">
      Mine grupper
    </div>
    <UserAddIcon
      class="cursor-pointer max-h-6 max-w-6 float-right grow text-primary-dark"
      @click="$router.push('/newCommunity')"
      alt="Opprett ny gruppe"
    />
  </div>
  <CommunityList :communities="myCommunities" :member="true" />
</template>

<script>
import CommunityList from "@/components/CommunityComponents/CommunityList.vue";
import CommunityService from "@/services/community.service";
import { UserAddIcon } from "@heroicons/vue/outline";

export default {
  data() {
    return {
      myCommunities: [],
    };
  },
  components: {
    CommunityList,
    UserAddIcon,
  },
  async beforeCreate() {
    this.myCommunities = await CommunityService.getUserCommunities();
  },
};
</script>
