import { mount } from "@vue/test-utils";
import NavBar from "@/components/BaseComponents/NavBar.vue";

describe("NavBar component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(NavBar);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
