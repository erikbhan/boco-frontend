import { mount } from "@vue/test-utils";
import NavBar from "@/components/BaseComponents/NavBar.vue"

describe("NavBar component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(NavBar);
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});