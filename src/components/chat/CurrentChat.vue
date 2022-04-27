<template>
    <div class="col-span-3 sm:col-span-2 block">
        <div class="w-full">
            <div class="flex justify-between border-b border-gray-300">
                <div class="grid space-y-2 content-center m-3">
                    <div class="w-8 h-0.5 bg-gray-600"></div>
                    <div class="w-8 h-0.5 bg-gray-600"></div>
                    <div class="w-8 h-0.5 bg-gray-600"></div>
                </div>
                <div class="relative flex items-center p-3">
                    <img class="object-cover w-10 h-10 rounded-full"
                        src="https://gitlab.stud.idi.ntnu.no/uploads/-/system/user/avatar/4168/avatar.png?width=400"
                        alt="username" />
                    <span class="block ml-2 font-bold text-gray-600">Sid</span>
                </div>
                <div></div>
            </div>

            <div class="relative w-full p-6 overflow-y-auto h-full">
                <ul class="space-y-2">
                    <div>
                        <ChatMessage v-for="(message, i) in messages" v-bind:key="i" :message="message"></ChatMessage>
                    </div>
                </ul>
            </div>

            <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <input type="text" placeholder="Message"
                    class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                    name="message" v-model="message" />
                <button v-on:click="sendMessage" style="padding: 10px; color: red;">
                    <svg class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import ChatMessage from "./ChatMessage.vue"
import axios from 'axios';
import { parseCurrentUser } from "@/utils/token-utils";
import ws from '@/services/ws';

export default {
    data: () => {
        return {
            messages: [],
            message: ""
        };
    },
    components: { ChatMessage },
    computed: {
        userid() {
            console.log(parseCurrentUser());
            return parseCurrentUser().account_id;
        },
        recipientID() {
            return this.userid == 1 ? 2 : 1;
        }
    },
    methods: {
        calculateSide(from) {
            console.log("userid ", this.userid)
            return from == this.userid ? 'end' : 'start'
        },
        async sendMessage() {
            const token = this.$store.state.user.token;

            // Post new message to server /chats/users/{userId}/messages 
            await axios.post(process.env.VUE_APP_BASEURL + `chats/users/${this.recipientID}/messages`, {
                message: this.message
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            ws.sendMessage({ sender: parseInt(this.userid), recipient: this.recipientID });
            this.reloadMessages();
        },
        async reloadMessages() {
                    const token = this.$store.state.user.token;
            const response = await fetch(`${process.env.VUE_APP_BASEURL}chats/users/${this.recipientID}/messages`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            this.messages = await response.json()
        }
    },
    async created() {
        console.log(this.$store.state.user, " hello")
        const token = this.$store.state.user.token;
        console.log(process.env.VUE_APP_BASEURL);
        // Fetch /chats/users/{userId}/messages from api
        const response = await fetch(`${process.env.VUE_APP_BASEURL}chats/users/${this.recipientID}/messages`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        ws.on("NEW_MESSAGE", () => {
            this.reloadMessages();
        })

        this.messages = await response.json()
    }
}
</script>