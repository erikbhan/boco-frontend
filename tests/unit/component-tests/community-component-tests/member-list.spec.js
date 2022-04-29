import { mount } from "@vue/test-utils";
import MemberList from "@/components/CommunityComponents/MemberList.vue"

describe("MemberList component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(MemberList);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});