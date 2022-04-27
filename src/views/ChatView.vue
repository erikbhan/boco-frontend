<template>
    <div class="min-h-full">
        <div class=" border rounded grid grid-cols-3 w-full">
            <div class="border-r border-gray-300 col-span-1">
                <ul class="hidden sm:block overflow-auto h-full">
                    <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
                    <li>
                        <ChatProfile v-for="(conversation, i) in conversations" :conversation="conversation" :key="i" @recipient="selectUser"></ChatProfile>
                    </li>
                </ul>
            </div>
            <CurrentChat v-if="selected" :recipient="selected" :key="key"></CurrentChat>
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
            conversations: null,
            selected: null
        };
    },
    computed: {
        userID() {
            return parseCurrentUser().account_id;
        },
        key() {
            return this.selected.userId || "ERROR" ;
        }
    },
    methods: {
        selectUser(value) {
            const userid = value
            this.conversations.find(conversation => {
                return conversation.recipient.userId == userid;  
            })
            this.selected = this.conversations.find(conversation => conversation.recipient.userId == userid).recipient;
            console.log(this.selected)
        }
    },
    async created() {
        const token = this.$store.state.user.token;
        // Get all conversations from api with /chats/users
        const response = await fetch(`${process.env.VUE_APP_BASEURL}chats/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }) // TODO add error handling
        const res = await response.json();
        this.conversations = res;
    }
}
</script>
