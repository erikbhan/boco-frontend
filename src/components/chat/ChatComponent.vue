<template>
    <div class="w-full h-full bg-teal-200">
        <div class="grid grid-cols-4 min-w-full border rounded">
            <div class="hidden sm:grid relative focus focus-within:text-gray-600">
                <ul class="overflow-auto">
                    <h2 class="ml-2 mb-2 text-gray-600 text-lg mx">Samtaler:</h2>
                    <ChatProfile profile="{{}}" lastMessage="{{}}"></ChatProfile>
                </ul>
            </div>
            <!-- Current Chat User-->
            <div class="col-span-4 sm:col-span-3 bg-white">
                <div class="flex border-gray-300 justify-between border-b">
                    <div class="grid sm:hidden space-y-2">
                        <div class="w-8 h-0.5 bg-gray-600"></div>
                        <div class="w-8 h-0.5 bg-gray-600"></div>
                        <div class="w-8 h-0.5 bg-gray-600"></div>
                    </div>
                    <div class="flex items-center self-center">
                        <img class="h-10 w-10 m-2 rounded-full object-cover"
                            src="https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                        <span class="block font-bold text-base ml-2 text-gray-600">
                            Sander Schrader
                        </span>
                        <span class="connected text-red-500 ml-2">
                            <svg class="place-content-center" width="6" height="6">
                                <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
                            </svg>
                        </span>
                    </div>
                    <div></div>
                </div>
                <div class="w-full overflow-y-auto height">
                    <ul>
                        <div class="w-full break-words flex justify-start">
                            <div style="max-width: 70%"
                                class="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative">
                                <span class="block">Hello bro htis is a test dajsalkdjø osajdkladkl sajldksjaklsj
                                    dksjdkas djklasklj adsjasdljaskdljkas dkløsdjlasdasdklnasa sdløkasdlk asdkasd ølasd
                                    kas øækasd kas als ddkaslødasøækdasklø løsakadskjløadlsks jadkj </span>
                                <span class="block text-xs text-right">10:30pm</span>
                            </div>
                        </div>
                        <div class="w-full break-words flex justify-end">
                            <div style="max-width: 70%" class="bg-blue-500 rounded px-5 py-2 my-2 text-white relative">
                                <span class="block">Hello d sjka dj skajdlksjad klajlkd jslkajd lskajdlk ajk lsdjl
                                    kajsdklj akljdklaj kldja ølkdjlaksjdlø k asjdiadajsiodjasijd land laskdj
                                    kalsjdkasljdksaj døklasmkl daskldnakl jdklsadnklsad lknsjldn</span>
                                <span class="block text-xs text-left">10:32pm</span>
                            </div>
                        </div>
                        <div class="w-full break-words flex justify-end">
                            <div style="max-width: 70%" class="bg-blue-500 rounded px-5 py-2 my-2 text-white relative">
                                <span class="block">Hello d sjka dj skajdlksjad klajlkd jslkajd lskajdlk ajk lsdjl
                                    kajsdklj akljdklaj kldja ølkdjlaksjdlø k asjdiadajsiodjasijd land laskdj
                                    kalsjdkasljdksaj døklasmkl daskldnakl jdklsadnklsad lknsjldn</span>
                                <span class="block text-xs text-left">10:32pm</span>
                            </div>
                        </div>
                        <div class="w-full break-words flex justify-end">
                            <div style="max-width: 70%" class="bg-blue-500 rounded px-5 py-2 my-2 text-white relative">
                                <span class="block">Hello d sjka dj skajdlksjad klajlkd jslkajd lskajdlk ajk lsdjl
                                    kajsdklj akljdklaj kldja ølkdjlaksjdlø k asjdiadajsiodjasijd land laskdj
                                    kalsjdkasljdksaj døklasmkl daskldnakl jdklsadnklsad lknsjldn</span>
                                <span class="block text-xs text-left">10:32pm</span>
                            </div>
                        </div>
                        <div class="w-full break-words flex justify-end">
                            <div style="max-width: 70%" class="bg-blue-500 rounded px-5 py-2 my-2 text-white relative">
                                <span class="block">Hello d sjka dj skajdlksjad klajlkd jslkajd lskajdlk ajk lsdjl
                                    kajsdklj akljdklaj kldja ølkdjlaksjdlø k asjdiadajsiodjasijd land laskdj
                                    kalsjdkasljdksaj døklasmkl daskldnakl jdklsadnklsad lknsjldn</span>
                                <span class="block text-xs text-left">10:32pm</span>
                            </div>
                        </div>
                        <div class="w-full break-words flex justify-end">
                            <div style="max-width: 70%" class="bg-blue-500 rounded px-5 py-2 my-2 text-white relative">
                                <span class="block">Hello d sjka dj skajdlksjad klajlkd jslkajd lskajdlk ajk lsdjl
                                    kajsdklj akljdklaj kldja ølkdjlaksjdlø k asjdiadajsiodjasijd land laskdj
                                    kalsjdkasljdksaj døklasmkl daskldnakl jdklsadnklsad lknsjldn</span>
                                <span class="block text-xs text-left">10:32pm</span>
                            </div>
                        </div>
                        <div class="w-full break-words flex justify-end">
                            <div style="max-width: 70%" class="bg-blue-500 rounded px-5 py-2 my-2 text-white relative">
                                <span class="block">Hello d sjka dj skajdlksjad klajlkd jslkajd lskajdlk ajk lsdjl
                                    kajsdklj akljdklaj kldja ølkdjlaksjdlø k asjdiadajsiodjasijd land laskdj
                                    kalsjdkasljdksaj døklasmkl daskldnakl jdklsadnklsad lknsjldn</span>
                                <span class="block text-xs text-left">10:32pm</span>
                            </div>
                        </div>
                        <div class="w-full break-words flex justify-start">
                            <div class="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative"
                                style="max-width: 70%">
                                <span class="block">Hello :)</span>
                                <span class="block text-xs text-left">10:32pm</span>
                            </div>
                        </div>
                    </ul>
                </div>
                <div class="align-bottom w-full py-3 px-3 flex items-center justify-between border-t border-gray-300">
                    <input aria-placeholder="Escribe un mensaje aquí" placeholder="Escribe un mensaje aquí"
                        class="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700"
                        type="text" name="message" required />

                    <button class="outline-none focus:outline-none" type="submit">
                        <svg class="text-gray-400 h-7 w-7 origin-center transform rotate-90"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ChatProfile from "@/components/ChatProfile.vue";

export default {
    components: {
        ChatProfile,
    },
    data() {
        return {};
    },
};
</script>
