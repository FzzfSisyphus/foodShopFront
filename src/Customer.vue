<script setup>
import {ref,onMounted} from 'vue'
import customerAPI from './services/customerAPI.js'

const props = defineProps({
  username: String,
  password: String
})

  let products = ref(['', ''])
  let buyflag = ref(false)
  let buyId = ref(0)
  let buyQuantity = ref(0)
  let userAddress = ref('')

  let productNumber = ref(20)
  let page = ref(1)
  let pagesize = ref(5)

  let describe=ref("")
  let merchant=ref("")
  let Price=ref(0)
  let Inventory=ref(0)
  let expireTime=ref("")

  onMounted(() => {
    load();
  });

  const load = async() => {
    try {
      const pageResponse = await customerAPI.getProductCount()
      console.log("here")
      productNumber.value = pageResponse.data.count//maybe the number just in the count
      console.log(productNumber.value)
      pagesize.value = productNumber.value
      //place to modify the page and pagesize according to the product number
      getPage(1)
    } catch (error) {
      console.log(error)
    }
  }

  const getPage= async(pagevalue) =>  {
    try {
      const productResponse = await customerAPI.getProduct(pagevalue, pagesize.value)
      products.value = []
      let p;

      console.log(productResponse.data.data)
      //products.value = productResponse.data.data
      
      for (let i = 0; i < productResponse.data.data.length; i++) {
        p = productResponse.data.data[i]
        console.log(p)
        products.value.push({
            productId: p.productId,
            describe: p.describe,
            picPath: p.picPath
        })
      }
      console.log(products.value)
    } catch (error) {
      console.log(error)
    }
  }

  async function buy(id)  {
    buyId.value = id
    buyflag.value = true
    let response
    try {
      response = await customerAPI.getDetail(id)
    } catch (error) {
      console.log(error)
    }
    describe =  response.data.describe
    merchant.value =  response.data.shopOwnerName
    Price.value =  response.data.price
    Inventory.value =  response.data.quantity
    expireTime.value =  response.data.expireTime
  }

  async function confirmbuy() {
    //push the quantity and productid to back end.
    try {
      let key = btoa(props.username+":"+props.password)
      
      let productInfo={
        productId: parseInt(buyId.value,10),
        quantity: parseInt(buyQuantity.value,10)
      }
      const response = await customerAPI.buyProduct(productInfo)
      let addrInfo={
        userName: props.username, 
        address: userAddress.value
      }
      const addState = await customerAPI.updateAddr(key,addrInfo)
      buyflag.value = false
      console.log(response.status)
      console.log(addState.status)
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
    <div v-if="props.username == ''">
      <h3 class="backfont">Please Sign in or Sign up to continue process!</h3>
    </div>
    <div v-else>
      <div class="backfont">
        <h2>Detail of the product</h2>
        <div>
          <p><div class="title">describe: </div>{{ describe }}</p>
          <p><div class="title">merchant: </div> {{ merchant }}</p>
          <p><div class="title">price:</div> {{ Price }}</p>
          <p><div class="title">inventory:</div> {{ Inventory }}</p>
          <p><div class="title">expireTime:</div> {{ expireTime }}</p>
        </div>
        <p>your name: {{props.username}}</p>
        <p>your address please:</p>
        <textarea v-model="userAddress" :placeholder="userAddress"></textarea>
        <p>how many do you want:</p>
        <textarea v-model="buyQuantity" :placeholder="buyQuantity"></textarea>
        <br>
      </div>
      <button @click="confirmbuy">confirm</button>
    </div>
    <button @click="buyflag=false">close</button>
  </div>

  <div>
    <h2>Enjoy Shopping</h2>

    <div class="productContainer">
      <!--      for the card in the equipments     -->
      <div v-for="product in products">
        <button @click="buy(product.productId)" class="product" :id="product.productId">
          <img class="itemPic" :src="product.picPath">
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
.backfont{
  color:azure;
}
.title{
  color: red;
}
.itemPic{
  width: 100%;
  height: 60%;
}
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
  max-width: 100%;
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