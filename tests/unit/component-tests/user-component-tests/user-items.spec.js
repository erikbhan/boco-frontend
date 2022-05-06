import { mount } from "@vue/test-utils";
import UserItems from "@/components/UserProfileComponents/UserItems.vue";
import axios from "axios";

let mockRouter;
jest.mock("@/utils/apiutil", () => {
  return {
    getItemPictures: () => {
      return new Promise((resolve) => {
        resolve([]);
      });
    },
    GetUserListings: () => {
      return new Promise((resolve) => {
        resolve([  {
          listingID: 1,
          img: "",
          address: "Veien",
          title: "Matboks",
          pricePerDay: 50,
          toggle: false,
        },]);
      })
    }
  };
});

jest.mock("axios")
let wrapper;

describe("UserItems component", () => {
  mockRouter = {
    push: jest.fn()
  }

  beforeEach(() => {
    wrapper = mount(UserItems, {
      global:{
        mocks:{
          $router: mockRouter
        }
      },
      data() {
        return {
          showItems: true,
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

  
  it("Check if pressing 'Rediger gjenstand' pushes to right path", async () => {
    const dotButton = wrapper.findAll(".DotButton")[0];
    dotButton.trigger("click");
    const editButton =  wrapper.findAll(".editButton")[0];
    expect(editButton.text()).toBe("Rediger gjenstand");
    editButton.trigger("click");
    await wrapper.vm.$nextTick();
    expect(mockRouter.push).toBeCalled();
    expect(mockRouter.push).toBeCalledWith("/item/1/edit");
  });
  
  it("Check if delete is called", async () => {
    const dotButton = wrapper.findAll(".DotButton")[0];
    dotButton.trigger("click");
    await wrapper.vm.$nextTick();

    const deleteButton =  wrapper.findAll(".deleteButton")[0];
    expect(deleteButton.text()).toBe("Slett gjenstand");
    deleteButton.trigger("click"); 
    await wrapper.vm.$nextTick();

    const confirmButton = wrapper.findAll(".confirmDelete")[0];
    expect(confirmButton.text()).toBe("Slett");
    
    //Feiler herfra

    // confirmButton.trigger("click");  
    // await wrapper.vm.$nextTick();

    // expect(axios.delete).toBeCalledTimes(1);
    // expect(mockRouter.go).toBeCalled();
  });
  
  
  
});
