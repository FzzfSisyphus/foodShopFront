<script setup>
import {ref} from 'vue'
import customerAPI from './services/customerAPI.js'
import router from "@/router";
import merchantAPI from "@/services/merchantAPI";

let userId = ref(router.currentRoute.value.params.userId)
let products = ref(['', ''])
let buyflag = ref(false)
let buyId = ref(0)
let buyQuantity = ref(0)
let userAddress = ref('')

let productNumber = ref(20)
let page = ref(1)
let pagesize = ref(5)

try {
  const pageResponse = customerAPI.getProductCount()
  productNumber.value = pageResponse.data.count//maybe the number just in the count
  //place to modify the page and pagesize according to the product number
  getPage(1)
} catch (error) {
  console.log(error)
}

function getPage(pagevalue) {
  try {
    const productResponse = merchantAPI.getProduct(userId.value, pagevalue, pagesize.value)
    products.value = []
    let p;
    for (p in productResponse.data) {
      products.value.push({
        itemId: p.itemId,
        describe: p.describe,
        picPath: p.picPath
      })
    }
  } catch (error) {
    console.log(error)
  }
}

function buy(id) {
  buyId.value = id
  buyflag.value = true
}

function confirmbuy() {
  //push the quantity and productid to back end.
  try {
    const response = customerAPI.buyProduct(buyId.value, buyQuantity.value)
    console.log(response.status)
  } catch (error) {
    console.log(error)
  }
}

function previous_page() {
  if (page.value <= 1) {
    return
  } else {
    page.value = page.value - 1
    getPage(page.value)
  }
}

function next_page() {
  if (page.value >= (productNumber.value / pagesize.value)) {
    return
  } else {
    page.value = page.value + 1
    getPage(page.value)
  }
}
</script>

<template>
  <div v-if="buyflag" class="overlay">
    <p>your address please:</p>
    <textarea v-model="userAddress" :placeholder="userAddress"></textarea>
    <p>how many do you want:</p>
    <textarea v-model="buyQuantity" :placeholder="buyQuantity"></textarea>
    <button @click="confirmbuy">confirm</button>
    <button @click="buyflag=false">close</button>
  </div>

  <div>
    <h1>Hi! Welcome to the E-Shop!</h1>

    <div class="productContainer">
      <!--      for the card in the equipments     -->
      <div v-for="product in products">
        <button @click="buy(product.itemId)" class="product" :id="product.itemId">
          <img :src="product.picPath">
          <p>{{ product.describe }}</p>
        </button>
      </div>
    </div>

    <button @click="previous_page">previous</button>
    <text>{{ page }}</text>
    <button @click="next_page">next</button>

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