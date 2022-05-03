import { shallowMount } from "@vue/test-utils";
import CommunityHamburger from "@/components/CommunityComponents/CommunityHamburger.vue";
import { route, router, $route, $router } from "../../mock-router";

describe("CommunityHamburger elements rendering", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CommunityHamburger, {
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
      global: {
        mocks: {
          route,
          router,
          $route,
          $router,
        },
      },
    });
  });

  it("renders all li fields", () => {
    expect(wrapper.find("#newItem").text()).toMatch("Opprett Utleie");
    expect(wrapper.find("#getMembers").text()).toMatch("Se Medlemmer");
    expect(wrapper.find("#adminGroup").text()).toMatch("Administrer Gruppe");
    expect(wrapper.find("#leaveGroup").text()).toMatch("Forlat Gruppe");
  });
});
