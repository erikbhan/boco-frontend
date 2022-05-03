<template>
  <div v-if="loggedIn">
    <div class="flex flex-row p-4 relative">
      <div class="text-xl md:text-2xl text-gray-600 font-medium w-full">
        Mine grupper
      </div>
      <UserAddIcon
        class="cursor-pointer max-h-6 max-w-6 float-right grow"
        @click="$router.push('/newCommunity')"
        alt="Opprett ny gruppe"
      />
    </div>
    <CommunityList :communities="myCommunities" :member="true" />
  </div>
  <p class="text-xl md:text-2xl text-gray-600 font-medium w-full p-4">
    Offentlige grupper
  </p>
  <CommunityList :communities="publicCommunities" :member="false" />
</template>

<script>
import CommunityList from "@/components/CommunityComponents/CommunityList.vue";
import { getMyGroups, getVisibleGroups } from "@/utils/apiutil";
import { UserAddIcon } from "@heroicons/vue/outline";

export default {
  name: "HomeView",
  data() {
    return {
      loggedIn: false,
      myCommunities: [],
      publicCommunities: [],
    };
  },
  components: {
    CommunityList,
    UserAddIcon,
  },
  async created() {
    this.publicCommunities = await getVisibleGroups();
    this.loggedIn = this.$store.state.user.token !== null;
    if (!this.loggedIn) return;

    this.myCommunities = await getMyGroups();

    // Double loop is bad; find a better way to do this
    for (var i = 0; i < this.publicCommunities.length; i++) {
      for (var j = 0; j < this.myCommunities.length; j++) {
        if (
          this.publicCommunities[i].communityId ===
          this.myCommunities[j].communityId
        ) {
          this.publicCommunities.splice(i, 1);
        }
      }
    }
  },
};
</script>
