<template>
  <div v-if="loggedIn">
    <div class="flex flex-row p-4 relative">
      <p class="capitalize font-bold w-full">Mine felleskap</p>
      <PlusIcon
        class="cursor-pointer max-h-6 max-w-6 float-right grow"
        @click="$router.push('/newCommunity')"
        v-if="loggedIn"
        alt="Lag ett nytt felleskap"
      />
    </div>
    <CommunityList :communities="myCommunities" :member="true" />
  </div>
  <p class="capitalize font-bold w-full p-4">Offentlige felleskap</p>
  <CommunityList :communities="publicCommunities" :member="false" />
</template>

<script>
import CommunityList from "@/components/CommunityComponents/CommunityList.vue";
import { getMyGroups, getVisibleGroups } from "@/utils/apiutil";
import { PlusIcon } from "@heroicons/vue/outline";

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
    PlusIcon,
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
