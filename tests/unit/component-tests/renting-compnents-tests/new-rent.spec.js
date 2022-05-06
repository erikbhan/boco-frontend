import { mount } from "@vue/test-utils";
import NewRent from "@/components/RentingComponents/NewRent.vue";
import axios from "axios";

jest.mock("@/utils/token-utils", () => {
  return {
    tokenHeader: () => {
      return {};
    },
    parseCurrentUser: () => {
      return { accountId: 1 };
    },
  };
});
jest.mock("axios");


describe("Confirm and send a rent request", () => {
  let wrapper;
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
          isAccepted: false,
        },
      },
    });
  });

  it("Is instansiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Check that fields show correct informations", () => {
    expect(wrapper.find("#rentTitle").text()).toEqual("Telt");
    expect(wrapper.find("#fromTime").text()).toMatch("19. September 2022");
    expect(wrapper.find("#toTime").text()).toMatch("23. September 2022");
    expect(wrapper.find("#price").text()).toEqual("Totaltpris: 200 kr");
  });

  it("Check that clicking rent opens confirmbox",async () => {
    wrapper.find("#confirmButton").trigger("click");
    
    
    // await wrapper.vm.$nextTick();
    await axios.put.mockResolvedValueOnce(props.newRentBox);
    
  

    // expect(wrapper.find("notification-modal").exists()).toBeTruthy();
    expect(axios.post).toHaveBeenCalledTimes(1);
  })
});
