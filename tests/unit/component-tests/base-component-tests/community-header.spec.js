import { mount } from "@vue/test-utils";
import CommunityHeader from "@/components/CommunityComponents/CommunityHeader.vue";

describe("CommunityHeader component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CommunityHeader, {
      //passing prop to component
      props: {
        adminStatus: true,
        community: {
          communityId: 1,
          name: "String",
          description: "String",
          visibility: 0,
          location: "String",
          picture: "String",
        },
      },
    });
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
