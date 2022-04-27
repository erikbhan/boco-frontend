<template>
  <ul>
    <li v-for="member in memberlist" :key="member.userId">
      <user-list-item-card :admin="admin" :user="member" />
    </li>
  </ul>
</template>

<script>
import UserListItemCard from "./UserProfileComponents/UserListItemCard.vue";

export default {
  data() {
    return {
      memberlist: [
        {
          userId: 2,
          firstName: "erik",
          lastName: "hansen",
        },
        {
          userId: 1,
          firstName: "Test",
          lastName: "Testesen",
        },
      ],
    };
  },
  components: {
    UserListItemCard,
  },
  props: {
    admin: Boolean,
  },
};
</script>
