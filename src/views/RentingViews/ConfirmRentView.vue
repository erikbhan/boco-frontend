<template>
  <!-- <new-rent :newRentBox="item" ></new-rent>
   -->
   <h1>Hei</h1>
</template>

<script>
//  import NewRent from '@/components/RentingComponents/NewRent.vue'
export default {
    name: "RentConfirm",
    components:{
        // NewRent
    },
    data(){
        return{
            // item: null
        }
    },
    mounted(){
        const item = this.$route.params.data;
        console.log("Hieee" + item);
    }
}
</script>

<style>

</style>