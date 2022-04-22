import { shallowMount } from "@vue/test-utils";
import LoginForm from "@/components/LoginForm";

describe("Tests labels in LoginForm component", () => {
    it("checks the E-post label", () => {
        const wrapper = shallowMount(LoginForm);

        expect(wrapper.find('#emailLabelId').text()).toMatch("E-post");
    });

    it("checks the password label", () => {
        const wrapper = shallowMount(LoginForm);

        expect(wrapper.find('#passwordLabelId').text()).toMatch("Passord");
    });
});
