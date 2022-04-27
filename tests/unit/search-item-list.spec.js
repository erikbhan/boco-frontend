import { shallowMount } from "@vue/test-utils";
import SearchItemListComponent from "@/components/SearchItemListComponent.vue";

describe("CreateNewGroup elements rendering", () => {
  it("Tests setting values of input field", async () => {
    const wrapper = shallowMount(SearchItemListComponent);

    const searchInput = wrapper.find("#searchInput");
    await searchInput.setValue("Dyson");
    expect(searchInput.element.value).toBe("Dyson");
  });
});
