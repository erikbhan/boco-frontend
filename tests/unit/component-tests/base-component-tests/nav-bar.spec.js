import { shallowMount } from "@vue/test-utils";
import NavBar from "@/components/BaseComponents/NavBar.vue";
import { store, $store } from "../../mock-store";

describe("NavBar component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(NavBar, {
      global: {
        mocks: {
          store,
          $store,
        },
      },
    });
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
