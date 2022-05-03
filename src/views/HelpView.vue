<template>
  <div class="py-12 bg-white justify-center">
    <div id="contact" class="border-gray-700 rounded w-11/12">
      <div class="mb-12 lg:mb-0 text-gray-700">
        <h2
          class="text-primary-dark mb-6 uppercase font-bold text-[32px] sm:text-[40px] lg:text-[36px] xl:text-[40px]"
        >
          GET IN TOUCH WITH US
        </h2>
        <p class="text-gray-500 leading-relaxed mb-9">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius
          tempor incididunt ut labore et dolore magna aliqua. Ut enim adiqua
          minim veniam quis nostrud exercitation ullamco
        </p>
        <div class="flex mb-8 w-full">
          <div class="flex items-center justify-center mr-6 overflow-hidden">
            <LocationMarkerIcon class="w-14 h-14 text-primary-dark rounded" />
          </div>
          <div class="w-full">
            <h4 class="font-bold text-gray-800 text-xl mb-1">Our Location</h4>
            <p>{{ contact.address }},</p>
            <p>{{ contact.city }},</p>
            <p>{{ contact.country }}</p>
          </div>
        </div>
        <div class="flex mb-8 max-w-[370px] w-full">
          <div class="flex items-center justify-center mr-6 overflow-hidden">
            <MailIcon class="w-16 h-16 text-primary-dark rounded" />
          </div>
          <div class="w-full">
            <h4 class="font-bold text-gray-800 text-xl mb-1">Email Address</h4>
            <p>{{ contact.email }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="faq">
      <div
        class="mx-auto text-center px-4 mt-12 text-2xl text-primary-dark font-semibold"
      >
        Frequently Asked Questions
      </div>
      <dl
        v-for="(faqItem, index) in FAQ"
        :key="index"
        class="mt-8 mx-auto max-w-screen-sm lg:max-w-screen-lg flex flex-col lg:flex-row lg:flex-wrap"
      >
        <div id="faqItem" class="lg:w-1/2">
          <div
            id="question-and-answer"
            class="select-none cursor-pointer border-2 mx-8 my-3 px-6 py-4 rounded-lg text-sm group"
          >
            <dt id="question">
              <div class="flex justify-between text-gray-800">
                <div class="font-bold">
                  {{ faqItem.question }}
                </div>
                <div>
                  <div v-if="!faqItem.toggle" @click="toggle(faqItem)">
                    <ChevronDoubleDownIcon
                      class="h-5 w-5 block rounded-full p-1"
                    />
                  </div>
                  <div v-else @click="toggle(faqItem)">
                    <ChevronDoubleUpIcon
                      class="h-5 w-5 block rounded-full p-1"
                    />
                  </div>
                </div>
              </div>
            </dt>
            <dd v-if="faqItem.toggle" class="mt-2 leading-snug text-gray-700">
              {{ faqItem.answer }}
            </dd>
          </div>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
import {
  ChevronDoubleDownIcon,
  LocationMarkerIcon,
  ChevronDoubleUpIcon,
  MailIcon,
} from "@heroicons/vue/outline";

export default {
  data() {
    return {
      contact: {
        email: "BorrowCompany@BorrowCommunity.com",
        address: "O. S. Bragstads Plass 2G",
        city: "Trondheim",
        country: "Norge",
      },
      FAQ: [
        {
          question: "Hvordan kan jeg legge ut en gjenstand til leie?",
          answer:
            "Ved å trykke på plus-ikonet i navigasjons-baren øverst på siden. Dette vil ta deg til et skjema for å legge ut en ny gjenstand.",
          toggle: false,
        },
      ],
    };
  },
  components: {
    ChevronDoubleDownIcon,
    ChevronDoubleUpIcon,
    MailIcon,
    LocationMarkerIcon,
  },
  methods: {
    toggle(faqItem) {
      faqItem.toggle = !faqItem.toggle;
    },
  },
};
</script>
