<template>
  <div
    class="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4"
  >
    <div class="flex flex-col w-10 h-10 justify-center items-center mr-4">
      <router-link to="">
        <img alt="profil" :src="getProfilePicture" />
      </router-link>
    </div>
    <div class="flex-1 pl-1">
      <div class="font-medium dark:text-white">{{ user.firstName }} {{ user.lastName }} </div>
    </div>
    <div class="flex flex-row justify-center">
      <button class="w-10 text-right flex justify-end">Åpne chat</button>
      <button v-if="admin" class="w-10 text-right flex justify-end">
        Fjern bruker
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserListItem",
  props: {
    user: Object,
    admin: Boolean,
  },
  methods: {
    getProfilePicture() {
      if (this.user.picture == "") {
        return "../assets/defaultUserProfileImage.jpg";
      }
      return this.user.picture;
    },
  },
};
</script>
