import { mount } from "@vue/test-utils";
import NewRent from "@/components/RentingComponents/NewRent.vue"

describe("Confirm and send a rent request", () => {
    let wrapper;
    const route = {
        params: {
            id: 1
        }
    }
    const router = {
        push: jest.fn(),
    }
    beforeEach(() => {
        
        wrapper = mount(NewRent, {
            props: {
                newRentBox: {
                    title: "Telt",
                    listingID: 1,
                    fromTime: "2022-09-19",
                    toTime: "2022-09-23",
                    price: 200,
                    renterId: 1,
                    isAccepted: false
                }
            },
            global: {
                mocks: {
                    $route: route,
                    $router: router
                }
            }
        });
    });

    it("renders correctly", () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it("Is instansiated", () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it("Check if fields show correct informations", () => {
        expect(wrapper.find("#rentTitle").text()).toEqual("Telt");
        expect(wrapper.find("#fromTime").text()).toMatch("19. September 2022");
        expect(wrapper.find("#toTime").text()).toMatch("23. September 2022");
        expect(wrapper.find("#price").text()).toEqual("Totaltpris: 200 kr");
    });

    it("Check if routed", async() => {
        await wrapper.find("#confirmButton").trigger('click')
        await wrapper.find("#confirmationNotification").trigger('click');
        expect(router.push).toBeCalledTimes(1);
    }
    );
});