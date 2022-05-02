import { mount } from "@vue/test-utils";
import NotificationModal from "@/components/BaseComponents/NotificationModal.vue";

describe("NotificationModal component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(NotificationModal, {
      //passing prop to component
      props: {
        visible: true,
        title: "String",
        message: "String",
      },
    });
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
