<template>
    <div class="min-h-full">
        <div class=" border rounded grid grid-cols-3 w-full">
            <div class="border-r border-gray-300 col-span-1">
                <ul class="hidden sm:block overflow-auto h-full">
                    <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
                    <li>
                        <ChatProfile></ChatProfile>
                    </li>
                </ul>
            </div>
            <CurrentChat></CurrentChat>
        </div>
    </div>
</template>

<script>
import ChatProfile from "@/components/chat/ChatProfile.vue";
import CurrentChat from "@/components/chat/CurrentChat.vue";
import {parseCurrentUser} from "@/utils/token-utils";

export default {
    components: {
        ChatProfile,
        CurrentChat
    },
    data() {
        return {
            ws: null
        };
    },
    computed: {
        userID() {
            return parseCurrentUser().account_id;
        }
    },
    async created() {
    }
}
</script>
