<script setup>
import {ref,onMounted} from 'vue'
import merchantAPI from './services/merchantAPI'

const props = defineProps({
  username: String,
  password: String
})

let productNumber = ref(20)
let page = ref(1)
let pagesize = ref(10)
let products = ref(['', ''])
let add = ref(false)


let pic_path = ref('')
let describe = ref('')
let price = ref(0)
let quantity = ref(0)
let expireTime = ref(20231010)
  onMounted(() => {
      load();
  });
  const load = async() => {
    try {
      const pageResponse = await merchantAPI.getProductCount(props.username)
      productNumber.value = pageResponse.data.count//maybe the number just in the count
      //place to modify the page and pagesize according to the product number
      getPage(1)
    } catch (error) {
      console.log(error)
    }
  }


  const getPage  = async(pagevalue) => {
    try {
      const productResponse = await merchantAPI.getProduct(props.username, pagevalue, pagesize.value)
      console.log(productResponse)
      products.value = []
      let p;
      for (let i = 0; i < productResponse.data.data.length; i++) {
        p = productResponse.data.data[i]
        console.log(p)
        products.value.push({
            productId: p.productId,
            describe: p.describe,
            picPath: p.picPath
        })
      }
      
    } catch (error) {
      console.log(error)
    }
  }

// every time add/delete one product, we flash the page to get the new product list
  async function newProduct() {
    let data;
    let username = props.username
    data = {
      username: String(username),
      picPath: pic_path.value,
      describe: describe.value,
      price: Number(price.value),
      quantity: Number(quantity.value),
      expireTime: String(expireTime.value)
    }
    try {
      console.log(pic_path.value)
      const response = await merchantAPI.createProduct(data)
      console.log(response.status)
      await load()
      add.value = false
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteProduct(itemid) {
    try {
      console.log(itemid)
      const response = await merchantAPI.deleteProduct(String(itemid))
      console.log(response.status)
      await load()
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
  function closeOverlay(){
    add=false
    load()
  }
</script>

<template>
  <div v-if="add" class="overlay">
    <div class="backfont">
      <h3>Put the information of the product</h3>
      <br>
      <p>picture: </p>
      <textarea v-model="pic_path" placeholder="Enter picture path">picture:</textarea>
      <br>
      <p>describe:</p>
      <textarea v-model="describe" placeholder="Food describe"></textarea>
      <br>
      <p>price:</p>
      <textarea v-model="price" placeholder="Enter price"></textarea>
      <br>
      <p>quantity:</p>
      <textarea v-model="quantity" placeholder="quantity"></textarea>
      <br>
      <p>expireTime: </p>
      <textarea v-model="expireTime" placeholder="yyyymmdd"> </textarea>
    </div>
    <button @click="newProduct">confirm</button>
    <button @click="closeOverlay">close</button>
  </div>
  <!--every time add/delete one product, we flash the page to get the new product list-->

  <div>
    <h2>Manage your store!</h2>

    <button @click="add=true">Add a new product</button>

    <h3>Your products:</h3>

    <div v-if="productNumber == 0">
      <h4>Seems you don't have any product...</h4>
      <h4>Create your first by click the right top button!</h4>
    </div>
    <div v-else>
      <div class="productContainer">
        <!--      for the card in the equipments     -->
        <div v-for="product in products">
          <p class="product" :id="product.productId">
            <img class="img" :src="product.picPath">
            <p>{{ product.describe }}</p>
            <button @click="deleteProduct(product.productId)">delete</button>
          </p>
        </div>
      </div>
    </div>

    <button @click="previous_page">previous</button>
    <text>{{ page }}</text>
    <button @click="next_page">next</button>

  </div>
</template>

<style scoped>
.backfont{
  color:azure
}
.img{
  height: 70%;
  width: 100%;
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