<script setup>
import {ref,onMounted} from 'vue'
import merchantAPI from './services/merchantAPI'

const props = defineProps({
  username: String,
  password: String
})

let productNumber = ref(20)
let page = ref(1)
let pagesize = ref(5)
let products = ref(['', ''])
let add = ref(false)


let pic_path = ref('')
let describe = ref('')
let price = ref(0)
let quantity = ref(0)

  onMounted(() => {
      load();
  });
  const load = async() => {
    try {
      const pageResponse = await merchantAPI.getProductCount(props.username.value)
     
      productNumber.value = pageResponse.data.count//maybe the number just in the count
      //place to modify the page and pagesize according to the product number
      getPage(1)
    } catch (error) {
      console.log(error)
    }
  }


  const getPage  = async(pagevalue) => {
    try {
      const productResponse = await merchantAPI.getProduct(props.username.value, pagevalue, pagesize.value)
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
  const newProduct = async() =>{
    let data;
    let username = props.username.value
    data = {
      username,
      pic_path,
      describe,
      price,
      quantity
    }
    try {
      const response = await merchantAPI.createProduct(data)
      console.log(response.status)
    } catch (error) {
      console.log(error)
    }
  }

  function deleteProduct(itemid) {
    try {
      const response = merchantAPI.deleteProduct(itemid)
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
  <div v-if="add" class="overlay">
    <addpro>
      <h3>Put the information of the product</h3>
      <br>
      <p>picture:</p>
      <textarea v-model="pic_path" :placeholder="pic_path">picture:</textarea>
      <br>
      <p>describe:</p>
      <textarea v-model="describe" :placeholder="describe"></textarea>
      <br>
      <p>price:</p>
      <textarea v-model="price" :placeholder="price"></textarea>
      <br>
      <p>quantity:</p>
      <textarea v-model="quantity" :placeholder="quantity"></textarea>
      <br>
    </addpro>
    <button @click="newProduct">confirm</button>
    <button @click="add=false">close</button>
  </div>
  <!--every time add/delete one product, we flash the page to get the new product list-->

  <div>
    <h2>Manage your store!</h2>

    <button @click="add=true">Add a new product</button>

    <h3>Your products:</h3>

    <dev v-if="productNumber == 0">
      <h4>Seems you don't have any product...</h4>
      <h4>Create your first by click the right top button!</h4>
    </dev>
    <dev v-else>
      <div class="productContainer">
        <!--      for the card in the equipments     -->
        <div v-for="product in products">
          <p class="product" :id="product.itemId">
            <img :src="product.picPath">
            <p>{{ product.describe }}</p>
            <button @click="deleteProduct(product.itemid)">delete</button>
          </p>
        </div>
      </div>
    </dev>

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