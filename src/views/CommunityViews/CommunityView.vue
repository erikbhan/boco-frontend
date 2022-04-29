<template>
  <div>
    <img
      class="cursor-pointer h-8 mr-4 mt-4 float-right"
      v-if="loggedIn"
      src="@/assets/newCommunity.png"
      alt="Legg til gruppe"
      @click="$router.push('/createNewGroup')"
    />
  </div>
  <div>
    <div id="myGroups" v-if="loggedIn">
      <div class="m-4">Mine grupper:</div>
      <CommunityList :communities="myCommunities" :member="true" />
    </div>
    <div id="localGroups">
      <div class="m-4">Offentlige grupper:</div>
      <CommunityList :communities="publicCommunities" :member="false" />
    </div>
  </div>
</template>

<script>
import CommunityList from "@/components/CommunityComponents/CommunityList.vue";
import { getMyGroups, getVisibleGroups } from "@/utils/apiutil";

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
  },
  async created() {
    this.loggedIn = this.$store.state.user.token !== null;
    this.publicCommunities = await getVisibleGroups();
    if (!this.loggedIn) return;
    this.myCommunities = await getMyGroups();
    this.publicCommunities = this.publicCommunities.filter(
      (val) => !this.myCommunities.includes(val)
    );
  },
};
</script>
