import { mount } from "@vue/test-utils";
import UserItems from "@/components/UserProfileComponents/UserItems.vue";

describe("UserItems component", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(UserItems, {
            props: {
                ItemCard: {
                    item: {
                        listingID: 1,
                        img: "",
                        address: "Veien",
                        title: "Matboks",
                        pricePerDay: 50,
                        toggle: false,
                    }
                }
            }
        });
    });

    it("renders correctly", () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it("is instantiated", () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it("Check information", () => {
        const byID = wrapper.find("#ItemCardPage");
        expect(byID.item.title.)
    })

});
