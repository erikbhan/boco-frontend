<template>
  <div
    class="bg-white shadow dark:bg-gray-800 select-none cursor-pointer hover:bg-gray-50 flex items-center p-4"
  >
    <!-- User image -->
    <div class="h-10 w-10 flex flex-col justify-center items-center mr-4">
      <router-link :to="'/profile/' + user.userId">
        <img alt="Profilbilde" :src="getProfilePicture" />
      </router-link>
    </div>

    <!-- User name -->
    <div class="flex-1 pl-1">
      <div class="font-medium dark:text-white">
        {{ user.firstName }} {{ user.lastName }}
      </div>
    </div>

    <!-- User rating -->
    <div class="hidden md:block flex-auto">
      <RatingComponent :rating="rating" :ratingType="'Gjennomsnitts rating'" />
    </div>

    <!-- Buttons -->
    <div class="flex flex-row gap-4">
      <IconButton
        v-if="buttons.includes('chat')"
        @click="openChatWithUser()"
        :text="'Chat'"
        :buttonColor="'blue'"
      >
        <ChatIcon
      /></IconButton>

      <IconButton
        v-if="buttons.includes('kick')"
        @click="kickUserFromCommunity()"
        :buttonColor="'red'"
        :text="'Spark'"
        ><BanIcon
      /></IconButton>

      <IconButton
        v-if="buttons.includes('accept')"
        @click="acceptMemberRequest()"
        :buttonColor="'green'"
        :text="'Godta'"
        ><CheckCircleIcon
      /></IconButton>

      <IconButton
        v-if="buttons.includes('reject')"
        @click="rejectMemberRequest()"
        :buttonColor="'red'"
        :text="'Avslå'"
        ><XCircleIcon
      /></IconButton>
    </div>
  </div>
</template>

<script>
import RatingComponent from "@/components/UserProfileComponents/RatingComponents/Rating.vue";
import IconButton from "@/components/BaseComponents/IconButton.vue";
import UserService from "@/services/user.service";
import CommunityAdminService from "@/services/community-admin.service";

import {
  ChatIcon,
  CheckCircleIcon,
  BanIcon,
  XCircleIcon,
} from "@heroicons/vue/outline";

export default {
  name: "UserListItem",
  data() {
    return {
      rating: -1.0,
      communityID: -1,
      profileImage: {
        src: require("../../assets/defaultUserProfileImage.jpg"),
      },
    };
  },
  components: {
    RatingComponent,
    IconButton,
    ChatIcon,
    CheckCircleIcon,
    BanIcon,
    XCircleIcon,
  },
  props: {
    user: Object,
    buttons: Array,
  },
  computed: {
    getProfilePicture() {
      if (this.user.picture !== "" && this.user.picture != null) {
        return this.user.picture;
      }
      return this.profileImage.src;
    },
  },
  methods: {
    openChatWithUser() {
      this.$router.push({
        name: "messages",
        query: { userID: this.user.userId },
      });
    },
    kickUserFromCommunity() {
      CommunityAdminService.removeUserFromCommunity(
        this.communityID,
        this.user.userId
      );
      //Find a better way to do this
      window.location.reload();
    },
    acceptMemberRequest() {
      CommunityAdminService.acceptUserIntoCommunity(
        this.communityID,
        this.user.userId
      );
    },
    rejectMemberRequest() {
      CommunityAdminService.rejectUserFromCommunity(
        this.communityID,
        this.user.userId
      );
    },
  },
  async created() {
    this.rating = await UserService.getUserRatingAverage(this.user.userId);
    this.communityID = this.$route.params.communityID;
  },
};
</script>
