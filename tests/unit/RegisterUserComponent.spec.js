import { mount } from "@vue/test-utils";
import RegisterFormComponent from "@/components/FormComponents/RegisterForm";

describe("RegisterFormComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(RegisterFormComponent);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("is instantiated", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders error message to user", async () => {
    await wrapper.setData({ errorMessage: "test message" });
    expect(wrapper.find('li[data-test="customErrorMsg"]').text()).toBe(
      "test message"
    );
  });

  it("renders the h2 text correctly", () => {
    expect(wrapper.find("h2").text()).toBe("Opprett ny bruker");
  });

  it("has a button", () => {
    expect(wrapper.exists("button")).toBe(true);
  });

  it("updates data when field is updated", async () => {
    await wrapper.find('input[data-test="firstNameTest"]').setValue("Gunnar");
    expect(wrapper.vm.firstName).toBe("Gunnar");
  });

  it("displays 5 error messages when submit is clicked with no data", async () => {
    await wrapper.find("button").trigger("click");
    expect(wrapper.findAll("li").length).toBe(5);
  });

  /*   it("button click with correct sum", () => {
    wrapper.setData({ guess: "15" });
    const button = wrapper.find("button");
    button.trigger("click");
    expect(wrapper.vm.message).toBe("SUCCESS!");
  }); */
});
