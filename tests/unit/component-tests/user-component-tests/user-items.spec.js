import { mount } from "@vue/test-utils";
import UserItems from "@/components/UserProfileComponents/UserItems.vue";

describe("UserItems component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(UserItems, {
      data() {
        return {
          items: [
            {
              listingID: 1,
              img: "",
              address: "Veien",
              title: "Matboks",
              pricePerDay: 50,
              toggle: false,
            },
          ],
        };
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Check headline", () => {
    expect(wrapper.find("#headline").text()).toMatch("Mine gjenstander");
  });
  
  // it("Check title", () => {
  //   expect(wrapper.findAll(".ItemCardPage")[0].exists()).toBeTruthy();
  // })
});
