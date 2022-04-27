<template>
  <nav class="flex items-center justify-between bg-white h-20 shadow-2xl">
    <div class="logo">
      <img
        class="m-2 cursor-pointer h-16"
        src="../assets/logo3.svg"
        alt="BoCo logo"
        @click="$router.push('/')"
      />
    </div>
    <ul class="flex">
      <li>
        <img class="m-6 cursor-pointer h-8 " src="../assets/additem.png" alt="Legg til" @click="$router.push('/addNewItem')"/>
      </li>
      <li>
        <img class="m-6 cursor-pointer h-8 " src="../assets/messages.png" alt="Meldinger" @click="$router.push('/messages')"/>
      </li>
      <li>
        <img
          class="m-6 cursor-pointer h-8"
          src="../assets/profile.png"
          alt="Profil"
          @click="loadProfile"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
import { parseUserFromToken } from "@/utils/token-utils";

export default {
  name: "NavBar.vue",

  methods: {
    async loadProfile() {
      if (this.$store.state.user.token !== null) {
        let user = parseUserFromToken(this.$store.state.user.token);
        console.log(user);
        let id = user.accountId;
        console.log(id);
        await this.$router.push("/profile/" + id);
      } else {
        await this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped></style>
