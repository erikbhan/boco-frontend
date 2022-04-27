<template>
  <nav class="flex items-center justify-between bg-white h-20 shadow-2xl">
    <div class="logo">
      <img class="ml-4 cursor-pointer h-16 " src="../assets/logo3.svg" alt="BoCo logo" @click="$router.push('/')"/>
    </div>
    <ul class="flex">
      <li>
        <div class="text-black mr-4 bg-gray-100 p-1 hover:bg-gray-600 transition-all rounded" @click="loadMessages">Meldinger</div>
      </li>
      <li>
        <div class="text-black mr-4 bg-gray-100 p-1 hover:bg-gray-600 transition-all rounded" @click="loadNotifications">Varsler</div>
      </li>
      <li>
        <div class="text-black mr-4 bg-gray-100 p-1 hover:bg-gray-600 transition-all rounded" @click="loadProfile">Profil</div>
      </li>
    </ul>
  </nav>
</template>

<script>
import {parseUserFromToken} from "@/utils/token-utils";

export default {
  name: "NavBar.vue",

  methods: {
    async loadMessages(){
      if(this.$store.state.user.token !== null){
        await this.$router.push("/messages")
      }
      else {
        await this.$router.push("/login");
      }

    },
    async loadNotifications(){
      if(this.$store.state.user.token !== null){
        await this.$router.push("/notifications")
      }
      else {
        await this.$router.push("/login");
      }

    },
    async loadProfile() {
      if(this.$store.state.user.token !== null){
      let user = parseUserFromToken(this.$store.state.user.token);
      console.log(user);
      let id = user.accountId;
      console.log(id);
      await this.$router.push("/profile/" + id);
      }
      else {
        await this.$router.push("/login");
      }
    }
  }
}


</script>

<style scoped>

</style>