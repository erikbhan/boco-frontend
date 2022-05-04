<template>
  <footer class=" bg-white dark:bg-gray-800 sm:flex-row border-1 border-t border-b border-gray-600 h-10 inset-x-0 bottom-0">

    <p class="float-left text-xs my-3 ml-4">© BoCo 2022 - All rights reserved</p>
    <QuestionMarkCircleIcon
        class="md:mt-0 mt-1 mr-4 float-right cursor-pointer h-8 md:h-10 text-primary-medium"
        alt="Hjelp"
        @click="$router.push('/help')"
    />
  </footer>
</template>

<script>
import { QuestionMarkCircleIcon } from "@heroicons/vue/outline"
export default {
  name: "FooterBar",

  components:{
    QuestionMarkCircleIcon,
  },
}
</script>