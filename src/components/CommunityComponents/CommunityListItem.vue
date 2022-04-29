<template>
  <NotificationModal
    @close="this.dialogOpen = false"
    :visible="dialogOpen"
    :title="community.name"
    :message="community.description"
  >
  </NotificationModal>
  <div
    @click="toggleDialog()"
    class="bg-white shadow dark:bg-gray-800 select-none cursor-pointer hover:bg-gray-50 flex items-center p-4"
  >
    <div class="h-10 w-10 flex flex-col justify-center items-center mr-4">
      <img alt="groupIMG" src="../../assets/group.png" />
    </div>
    <div class="flex-1 pl-1 overflow-hidden">
      <div class="font-medium dark:text-white truncate">
        {{ community.name }}
      </div>
    </div>
    <div class="flex flex-row justify-center items-center">
      <LockClosedIcon
        v-if="community.visibility === 0"
        class="max-h-6 max-w-6 shrink m-2"
      />
      <LockOpenIcon
        v-if="community.visibility === 1"
        class="max-h-6 max-w-6 shrink m-2"
      />
      <button
        @click="goToJoin(community.communityId)"
        v-if="!member"
        class="px-4 py-2 w-24 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      >
        Bli med
      </button>
      <button
        v-if="member"
        @click="goToGroup(community.communityId)"
        class="px-4 py-2 w-24 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      >
        Gå til
      </button>
    </div>
  </div>
</template>

<script>
import { LockClosedIcon, LockOpenIcon } from "@heroicons/vue/outline";
import NotificationModal from "@/components/BaseComponents/NotificationModal.vue";

export default {
  name: "CommunityListItem",
  components: {
    NotificationModal,
    LockClosedIcon,
    LockOpenIcon,
  },
  data() {
    return {
      dialogOpen: false,
    };
  },
  props: {
    community: Object,
    member: Boolean,
  },
  methods: {
    goToGroup(id) {
      this.$router.push("/community/" + id);
    },
    goToJoin(id) {
      this.$router.push("/community/" + id + "/join");
    },
    toggleDialog() {
      this.dialogOpen = !this.dialogOpen;
    },
  },
};
</script>
