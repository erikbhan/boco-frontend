import { shallowMount } from "@vue/test-utils";
import CommunityHamburger from "@/components/CommunityComponents/CommunityHamburger.vue";

describe("CommunityHamburger elements rendering", () => {
  it("renders all li fields", () => {
    const wrapper = shallowMount(CommunityHamburger);

    expect(wrapper.find("#newItem").text()).toMatch("Opprett Utleie");
    expect(wrapper.find("#getMembers").text()).toMatch("Se Medlemmer");
    expect(wrapper.find("#adminGroup").text()).toMatch("Administrer Gruppe");
    expect(wrapper.find("#leaveGroup").text()).toMatch("Forlat Gruppe");
  });
});
