import { shallowMount } from "@vue/test-utils";
import SearchItemListComponent from "@/components/CommunityComponents/SearchItemList.vue";

describe("CreateNewGroup elements rendering", () => {
  it("Tests setting values of input field", async () => {
    const wrapper = shallowMount(SearchItemListComponent);

    const searchInput = wrapper.find("#searchInput");
    await searchInput.setValue("Dyson");
    expect(searchInput.element.value).toBe("Dyson");
  });
});
