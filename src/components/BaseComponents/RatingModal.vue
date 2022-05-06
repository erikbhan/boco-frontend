<template>
  <!-- Main modal -->
  <div
    v-if="visible"
    class="fixed grid place-items-center bg-gray-600 bg-opacity-50 top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto inset-0 h-full"
  >
    <div class="relative w-full h-full max-w-2xl p-4 md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ name }}
          </h3>
          <button
            @click="close()"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <p class="text-lg leading-relaxed text-gray-500 dark:text-gray-400">
            {{ title }}
          </p>
        </div>

        <div class="ml-6 mt-4">
          <p
            class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            v-show="renterIsReceiverOfRating"
          >
            Gi en vurdering til utleieren
          </p>
          <p
            class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            v-show="!renterIsReceiverOfRating"
          >
            Gi en vurdering til leietakeren
          </p>
        </div>

        <div class="flex justify-center px-4">
          <textarea
            class="w-full h-40 bg-gray-200 mb-4 ring-1 ring-gray-400 rounded-xl"
          />
        </div>

        <div class="flex items-center justify-center mb-8">
          <svg
            class="w-10 h-10 text-warn cursor-pointer"
            :class="rating[0]"
            @click="setRating(1)"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
          <svg
            class="w-10 h-10 text-warn cursor-pointer"
            :class="rating[1]"
            @click="setRating(2)"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
          <svg
            class="w-10 h-10 text-warn cursor-pointer"
            :class="rating[2]"
            @click="setRating(3)"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
          <svg
            class="w-10 h-10 text-warn cursor-pointer"
            :class="rating[3]"
            @click="setRating(4)"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
          <svg
            class="w-10 h-10 text-warn cursor-pointer"
            :class="rating[4]"
            @click="setRating(5)"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
        </div>

        <div class="flex justify-center mb-4">
          <Button :text="'Send en vurdering'" @click="sendRating"></Button>
        </div>

        <!-- Modal footer -->
        <div class="rounded-b border-t border-gray-200 dark:border-gray-600">
          <!-- Slot: Add any html you want here -->
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/BaseComponents/ColoredButton";
import { postNewRating } from "@/utils/apiutil";

export default {
  name: "RatingModal",
  data() {
    return {
      score: 3,
      comment: "",
      rating: [
        "text-warn",
        "text-warn",
        "text-warn",
        "text-gray-300",
        "text-gray-300",
      ],
    };
  },
  props: {
    visible: Boolean,
    name: String,
    title: String,
    rentID: Number,
    renterIsReceiverOfRating: Boolean,
  },

  components: {
    Button,
  },
  methods: {
    setRating(ratingNumber) {
      this.score = ratingNumber;
      for (let i = 0; i < 5; i++) {
        if (i < ratingNumber) {
          this.rating[i] = "text-warn";
        } else {
          this.rating[i] = "text-gray-300";
        }
      }
    },
    close() {
      this.$emit("close");
    },
    async sendRating() {
      const ratingInfo = {
        score: this.score,
        comment: this.comment,
        renterIsReceiverOfRating: this.renterIsReceiverOfRating,
        rentID: this.rentID,
      };

      const postResponse = await postNewRating(ratingInfo);

      console.log("posted: " + postResponse);

      this.$router.push("/");
    },
  },
};
</script>
