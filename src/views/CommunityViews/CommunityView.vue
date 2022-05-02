<template>
  <div v-if="loggedIn">
    <div class="flex flex-row p-4 relative">
      <p class="text-xl md:text-2xl text-gray-600 font-medium w-full">Mine felleskap</p>
      <UserAddIcon
        class="cursor-pointer max-h-6 max-w-6 float-right grow"
        @click="$router.push('/newCommunity')"
        v-if="loggedIn"
        alt="Lag ett nytt felleskap"
      />
    </div>
    <CommunityList :communities="myCommunities" :member="true" />
  </div>
  <p class="text-xl md:text-2xl text-gray-600 font-medium w-full m-4">Offentlige felleskap</p>
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

    // Remove all of the user's communities from the public communities arrays
    this.publicCommunities = this.publicCommunities.filter(
      (val) => !this.myCommunities.includes(val)
    );
  },
};
</script>
