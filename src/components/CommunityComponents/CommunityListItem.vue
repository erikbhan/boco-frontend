<template>
  <CustomFooterModal
    @close="this.dialogOpen = false"
    :visible="dialogOpen"
    :title="community.name"
    :message="community.description"
  >
    <div class="flex justify-center p-2">
      <ColoredButton
        v-if="!member"
        :text="'Bli med'"
        @click="goToJoin(community.communityId)"
      />
      <ColoredButton
        v-if="member"
        :text="'Gå til'"
        @click="goToGroup(community.communityId)"
      />
    </div>
  </CustomFooterModal>
  <div
    @click="toggleDialog()"
    class="bg-white shadow dark:bg-gray-800 select-none cursor-pointer hover:bg-gray-50 flex items-center p-4"
  >
    <div class="h-10 w-10 flex flex-col justify-center items-center mr-4">
      <UserGroupIcon v-if="!community.image" alt="Felleskapets bilde" />
      <!-- TODO: USE COMMUNITY IMAGE <img alt="Felleskapets bilde" src="@/assets/group.png" /> -->
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
    </div>
  </div>
</template>

<script>
import CustomFooterModal from "@/components/BaseComponents/CustomFooterModal.vue";
import ColoredButton from "@/components/BaseComponents/ColoredButton.vue";
import { UserGroupIcon, LockClosedIcon } from "@heroicons/vue/outline";

export default {
  name: "CommunityListItem",
  components: {
    CustomFooterModal,
    ColoredButton,
    UserGroupIcon,
    LockClosedIcon,
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
