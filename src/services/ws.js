const Stomp = require("stompjs");
const SockJS = new require("sockjs-client")(process.env.VUE_APP_BASEURL + "ws");
import {parseCurrentUser} from "@/utils/token-utils";

// Create a Singleton function
// Events fired by websocket, MESSAGE
const ws = (function () {

    // Object of all injected functions that the client may want
    const handlers = {};

    const fire = function (event, data) {
        if (handlers[event]) {
            handlers[event](data)
        }
    };

    const onMessageReceived = (payload) => {
        const data = JSON.parse(payload.body);

        console.log("New message!")
        // Fire message event
        fire("MESSAGE", JSON.parse(payload.body));
        
        if(data.status == "NEW_MESSAGE") fire("NEW_MESSAGE", JSON.parse(payload.body));

        console.log("Received message: " + payload);
    }

    const onConnected = () => {
        
        console.log("Websocket Connected");
        stompClient.subscribe(
            "/user/" + parseCurrentUser().accountId + "/queue/messages",
            onMessageReceived
        );
    };


    const onError = () => {

    };

    let stompClient = Stomp.over(SockJS);

    stompClient.connect({}, onConnected, onError);



    return {
        on: function (event, callback) {
            handlers[event] = callback;
        },
        fire: fire,
        isActive: function (event) {
            return !!handlers[event];
        },
        end: function (event) {
            if (handlers[event]) {
                delete handlers[event];
            } else {
                throw new Error("No handler for event: " + event);
            }
        },
        sendMessage: ({sender, recipient, status }) => {
            if(status) console.log(status)
            stompClient.send("/app/chat", {}, JSON.stringify({
                from: sender,
                to: recipient,
                id: null,
                status: "NEW_MESSAGE"
            }));
        },
        test: true
    }
})();


export default ws;