<template>
  <nav
    class="flex items-center bg-white justify-between h-10 md:h-14 border-1 border-b border-gray-300 border-solid sticky top-0 z-50"
  >
    <div class="logo">
      <img
        class="m-1 ml-4 cursor-pointer h-9 md:h-12"
        src="../../assets/logo3.svg"
        alt="BoCo logo"
        @click="$router.push('/')"
      />
    </div>
    <ul class="flex justify-between">
      <li class="cursor-pointer" @click="$router.push('/newItem')">
        <PlusIcon
          class="m-6 md:mr-2 h-7 text-primary-medium float-left"
          alt="Legg til"
        />
        <a class="hidden md:block mt-7 text-sm float-right">Legg til</a>
      </li>
      <li class="cursor-pointer" @click="$router.push('/messages')">
        <ChatAlt2Icon
          class="m-6 md:mr-2 h-7 text-primary-medium float-left"
          alt="Meldinger"
        />
        <a class="hidden md:block mt-7 text-sm float-right">Meldinger</a>
      </li>
      <li class="cursor-pointer" @click="loadProfile">
        <UserCircleIcon
          class="m-6 md:mr-2 h-7 text-primary-medium float-left"
          alt="Profil"
        />
        <a class="hidden md:block mr-4 mt-7 text-sm float-right">Profil</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { parseUserFromToken } from "@/utils/token-utils";
import { PlusIcon, ChatAlt2Icon, UserCircleIcon } from "@heroicons/vue/outline";

export default {
  name: "NavBar.vue",

  components: {
    PlusIcon,
    ChatAlt2Icon,
    UserCircleIcon,
  },

  methods: {
    async loadProfile() {
      if (this.$store.state.user.token !== null) {
        let user = parseUserFromToken(this.$store.state.user.token);
        let id = user.accountId;
        await this.$router.push("/profile/" + id);
      } else {
        await this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped></style>
