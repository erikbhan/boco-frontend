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
      <li class="cursor-pointer" @click="loadMessages">
        <div class="notification-container">
          <ChatAlt2Icon
            class="m-6 md:mr-2 h-7 text-primary-medium float-left"
            alt="Meldinger"
          />
          <p class="notification" v-if="newMessages > 0">{{ notifications }}</p>
          <a class="hidden md:block mt-7 text-sm float-right">Meldinger</a>
        </div>
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
import ws from "@/services/ws";

export default {
  name: "NavBar.vue",
  data() {
    return {
      newMessages: 0,
    };
  },
  computed: {
    notifications() {
      // if  new messages is greater than 99 show +99
      if (this.newMessages > 99) {
        return "+99";
      } else {
        return this.newMessages;
      }
    },
  },
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
    loadMessages() {
      this.newMessages = 0;
      this.$router.push("/messages");
    },
  },
  created() {
    ws.on(
      "NEW_MESSAGE",
      () => {
        if (this.$router.currentRoute.value.name == "messages") return;
        this.newMessages += 1;
      },
      "header"
    );
  },
};
</script>

<style scoped>
.notification-container {
  position: relative;
}
.notification {
  position: absolute;
  background-color: #ff5a5f;
  top: 0;
  min-width: 20px;
  min-height: 20px;
  padding: 0.25rem;
  transform: translate(-80%, -30%);
  color: white;
  font-size: 10px;
  border-radius: 50%;
  font-weight: bold;
  text-align: center;
  right: 0;
  cursor: pointer;
}
</style>
