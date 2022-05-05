import { shallowMount } from "@vue/test-utils";
import DateRangePicker from "@/components/TimepickerComponents/DatepickerRange/DatepickerRange.vue";

describe("DateRangePicker.vue", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(DateRangePicker, {
            propsData: {
                blockedDaysRange: [
                    [new Date(1651739228545)],  // 5 May
                    [
                        new Date(1652733228545), // 16 May
                        new Date(1652833228545) // 18 May
                    ]]
            }
        });
    });

    it("Is instansiated", () => {
        expect(wrapper.exists()).toBeTruthy();
    });
})
