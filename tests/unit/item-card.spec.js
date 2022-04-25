import { shallowMount } from "@vue/test-utils";
import ItemCard from "@/components/ItemCard.vue";

describe("ItemCard elements rendering", () => {
    it("renders all paragraphs", async() => {
        const wrapper = shallowMount(ItemCard);

        await wrapper.setData({
            item : {
                title : 'Dyson',
                adresse: 'Trondheim',
                price : '500'
            }
        })

        expect(wrapper.find("#title").text()).toBe("Dyson");
        expect(wrapper.find("#adress").text()).toBe("Trondheim");
        expect(wrapper.find("#price").text()).toBe("500");
    });
});
