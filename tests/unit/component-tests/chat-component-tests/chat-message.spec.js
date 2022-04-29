import { mount } from "@vue/test-utils";
import ChatMessage from "@/components/ChatComponents/ChatMessage.vue"

describe("ChatMessageComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ChatMessage, {
        //passing prop to component
        computed: {
          userID() {
            return 1;
          }
        },
        props: {
            message: {
              id: 1,
              content: "string",
              timestamp: "2022-04-29T08:20:42.850Z",
              from: 1,
              to: 3
            } 
        }
    });
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});