import { shallowMount } from "@vue/test-utils";
import CreateNewGroup from "@/components/CreateNewGroup.vue";

describe("CreateNewGroup elements rendering", () => {
  it("renders all labels", () => {
    const wrapper = shallowMount(CreateNewGroup);

    expect(wrapper.find("#radioBoxLabel").text()).toMatch("Synlighet");
    expect(wrapper.find("#radioBoxOpenLabel").text()).toMatch("Åpen");
    expect(wrapper.find("#radioBoxPrivateLabel").text()).toMatch("Privat");
    expect(wrapper.find("#titleLabel").text()).toMatch("Gruppenavn");
    expect(wrapper.find("#selectCategoryLabel").text()).toMatch("Kategori");
    expect(wrapper.find("#descriptionLabel").text()).toMatch("Beskrivelse");
    expect(wrapper.find("#imageLabel").text()).toMatch("Bilde");
  });

  it("Tests setting values of input field", async () => {
    const wrapper = shallowMount(CreateNewGroup);

    const titleInput = wrapper.find("#title");
    await titleInput.setValue("Fjellgata");
    expect(titleInput.element.value).toBe("Fjellgata");

    const selectedCategory = wrapper.find("#categories");
    await selectedCategory.setValue("Borettslag");
    expect(selectedCategory.element.value).toBe("Borettslag");

    const descriptionInput = wrapper.find("#description");
    await descriptionInput.setValue("Dette er et borettslag");
    expect(descriptionInput.element.value).toBe("Dette er et borettslag");
  });

  it("Tests if radio box checks", async () => {
    const wrapper = shallowMount(CreateNewGroup);

    const radioInputOpen = wrapper.find("#flexRadioOpen");
    await radioInputOpen.setChecked();
    expect(radioInputOpen.element.checked).toBeTruthy();

    const radioInputPrivate = wrapper.find("#flexRadioPrivate");
    await radioInputPrivate.setChecked();
    expect(radioInputPrivate.element.checked).toBeTruthy();
  });
});
