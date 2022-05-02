import { mount } from "@vue/test-utils";
import IconButton from "@/components/BaseComponents/IconButton.vue";

describe("IconButtonComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(IconButton, {
      //passing prop to component
      props: {
        text: "hei",
      },
    });
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
