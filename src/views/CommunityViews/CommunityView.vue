<template>
  <div>
    <img
        class="cursor-pointer h-8 mr-4 mt-4 float-right"
        v-if="isLoggedIn"
        src="@/assets/newCommunity.png"
        alt="Legg til gruppe"
        @click="$router.push('/createNewGroup')"
    />
  </div>
  <div>
    <div id="myGroups" v-if="isLoggedIn">
      <div class="m-4" >Mine grupper:</div>
      <group-list :groupList="myGroups" />
    </div>
    <div id="localGroups">
      <div class="m-4">Offentlige grupper:</div>
      <group-list :groupList="localGroups" />
    </div>
  </div>

</template>

<script>
import GroupList from "@/components/CommunityComponents/CommunityList.vue";
import { getMyGroups, getVisibleGroups } from "@/utils/apiutil";

export default {
  name: "HomeView",
  data() {
    return {
      isLoggedIn: false,
      myGroups: [],
      localGroups: [],
    };
  },
  components: {
    GroupList,
  },
  methods: {
    async getMyGroups() {
      this.myGroups = await getMyGroups();
    },
    async getPotentialGroups() {
      this.localGroups = await getVisibleGroups();
    },
  },
  async created() {
    await this.getMyGroups();
    await this.getPotentialGroups();
    if(this.$store.state.user.token !== null){
      this.isLoggedIn = true
    }
    },
};
</script>
