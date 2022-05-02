<template>
  <div>
    <div>
      <div
        v-bind:class="{'grid grid-flow-row-dense grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full place-items-center': noPicture}"
      >
        <ImageCarousel :images="pictures"></ImageCarousel>
      </div>
    </div>
    <!-- Product info -->
    <div
      class="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8"
    >
      <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <h1
          class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl"
        >
          {{ item.title }}
        </h1>
      </div>
      <div
        class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"
      >
        <!-- Description and details -->
        <div>
          <h3 class="text-base font-semibold text-gray-900">Pris per dag</h3>

          <div class="space-y-6">
            <p class="text-2xl font-medium text-gray-900">
              {{ item.pricePerDay }} kr
            </p>
          </div>
        </div>
        <div class="mt-4">
          <h3 class="text-base font-base text-gray-900">Ledige tidspunkter</h3>

          <div>
            <p class="text-sm text-gray-900">
              (placeholder skal byttes ut med date-picker)
            </p>
          </div>
        </div>
        <div class="mt-10">
          <div class="mt-4 space-y-6">
            <p class="text-sm text-gray-600">{{ item.description }}</p>
          </div>
        </div>
        <div class="mt-6">
          <!-- Add in method for displaying user card. Use item.userID on the method -->
          (Placeholder) Add usercard here
          <UserListItemCard :user="userForId"></UserListItemCard>
        </div>
        <div>
          <div class="mt-4 space-y-6">
            <p class="text-base font-semibold text-gray-900">
              {{ item.address }}
            </p>
          </div>
        </div>
        <div class="mt-10">
          <h3 class="text-base font-semibold text-gray-900">Totalprisen er</h3>

          <div class="mt-2 space-y-2">
            <p class="text-xl font-medium text-gray-900">
              mye (Change with tot price from calc method)
            </p>
            <button>
              <!-- This button should send you to the rent page -->
              Rent page
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getItem } from "@/utils/apiutil";
import { getItemPictures } from "@/utils/apiutil";
import { getUser } from "@/utils/apiutil";
import ImageCarousel from "@/components/RentingComponents/ImageCarousel.vue";
import UserListItemCard from "@/components/UserProfileComponents/UserListItemCard.vue";

export default {
  name: "ItemInfo",
  data() {
    return {
      item: {
        listingID: 0,
        title: "",
        description: "",
        pricePerDay: 0,
        address: "",
        userID: 0,
        categoryNames: [],
        communityIDs: [],
      },
      images: [
        {
          listingID: 0,
          picture: "",
        },
      ],
      pictures: [],
      noPicture: true,
      userForId: Object,
    };
  },
  components: {
    ImageCarousel,
    UserListItemCard,
  },
  methods: {
    async getItem() {
      let id = this.$router.currentRoute.value.params.id;
      this.item = await getItem(id);
      console.log(this.item);
      console.log("This is the user id " + this.item.userID);
    },
    async getItemPictures() {
      let id = this.$router.currentRoute.value.params.id;
      this.images = await getItemPictures(id);
      
      if(this.images.length < 1) {
          let noImage = {
              src: require('@/assets/default-product.png'),
              alt: "No image found",
          };
          this.pictures.push(noImage);
      } else {
        this.noPicture = false;
        for (let i = 0; i < this.images.length; i++) {
            let oneImage = {
                src: this.images[i].picture,
                //How do i make this accurate to the image?
                alt: "An image",
            };
            this.pictures.push(oneImage);
        }
      }
      //TODO fixs so each image get a correct alt text.
    },
    async getUser(userId) {
        this.userForId = await getUser(userId);
        console.log(this.userForId);
    }
  },
  async beforeMount() {
    await this.getItemPictures();
    await this.getItem();
    await this.getUser(this.item.userID);
  },
};
</script>

<style></style>