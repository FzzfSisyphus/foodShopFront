<script setup>
import {ref} from 'vue'
import customerAPI from './services/customerAPI.js'

let userId = ref(0)
let products = ref([])
let add = ref(false)

let newitemName = ref('')
let newdescribe = ref('')
let newquantity = ref(0)
let newprice = ref(0)
let newpicPath = ref('')
let newexpireTime = ref('')

// try {
//   const response = customerAPI.getWarehouse(userId.value)
//   coupons.value = response.data.coupons;
//   credit.value = response.data.credit;
//   let equipt;
//   for (equipt in response.data) {
//     equipments.value.push({
//       itemId: equipt.itemId,
//       itemName: equipt.itemName,
//       describe: equipt.describe,
//       quantity: equipt.quantity,
//       price: equipt.price,
//       picPath: equipt.picPath
//     });
//   }
// } catch (error) {
//   console.log(error)
// }

function getRandomColor() {
  return "hsl(" + Math.random() * 360 + "), 100%, 75%";
}

function newProduct() {

}

function deleteProduct(itemid){

}
</script>

<template>
  <div v-if="add" class="overlay">
    <choosetobuy/>
    <button @click="newProduct()">confirm</button>
    <button @click="add=false">close</button>
  </div>

  <div>
    <h1>Hi! Welcome to the E-Shop!</h1>

    <h2>Your products:</h2>

    <button @click="add=true">Add a new product</button>

    <div class="productContainer">
      <!--      for the card in the equipments     -->
      <div v-for="product in products">
        <p class="product" :id="product.itemId">
          <p>picture</p>
          <p>{{ product.itemName }}</p>
          <p>{{ product.describe }}</p>
          <p>{{ product.quantity }}</p>
          <p>{{ product.merchant }}</p>
          <p>{{ product.expireTime }}</p>
          <p>{{ product.price }}</p>
        </p>
        <button @click="deleteProduct(product.itemid)">delete</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.77);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.productContainer {
  max-width: 1000px;
  padding: 10px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}

.product {
  width: 325px;
  height: 325px;
  background-color: #98d3fc;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;
  margin-bottom: 20px;
}

.jump {
  width: 750px;
  background-color: cyan;
  border-radius: 10px;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.ErrorMsg {
  color: red;
}
</style>