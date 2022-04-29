<template>
  <div class="flex border-b border-gray-200 dark:border-gray-700">
    <button
      v-for="(tab, index) in tabs"
      :key="tab"
      @click="changeTab(tab, index)"
      class="h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none"
      :class="[activeTab === index ? activeClasses : inactiveClasses]"
    >
      {{ tabNames[index] }}
    </button>
  </div>
  <MemberList v-if="loadedComponent === 'MemberList'" />
</template>

<script>
import MemberList from "@/components/CommunityComponents/MemberList.vue";

export default {
  name: "CommunityAdminView",
  components: {
    MemberList,
  },
  data() {
    return {
      tabs: ["MemberList", "Hey"],
      tabNames: ["Medlemsliste", "Medlemsforespørsler"],
      activeTab: 0,
      loadedComponent: "MemberList",
    };
  },
  methods: {
    changeTab(tab, index) {
      this.loadedComponent = tab;
      this.activeTab = index;
    },
  },
  computed: {
    activeClasses() {
      return {
        "text-blue-600": true,
        "border-blue-500": true,
        "dark:border-blue-400": true,
        "dark:text-blue-300": true,
      };
    },
    inactiveClasses() {
      return {
        "text-gray-700": true,
        "border-transparent": true,
        "dark:text-white": true,
        "cursor-base": true,
        "hover:border-gray-400": true,
      };
    },
  },
};
</script>

<style></style>
