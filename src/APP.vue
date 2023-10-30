<script setup>
import Merchant from "@/Merchant.vue";
import Customer from "@/Customer.vue";
import SignUp from "@/account/SignUp.vue";
import SignIn from "@/account/SignIn.vue";
import accountAPI from './services/accountAPI'
import {ref} from "vue";

let component = ref('customer')

let accountFlag = ref(false)
let Sign = ref(true)
let username = ref('')
let password = ref('')

</script>

<template>
  <!--  place to login or sign up  -->
  <div v-if="accountFlag" class="overlay">
    <dev v-if="Sign">
      <SignIn @Nosign="(flag) => accountFlag = flag"
              @unm="(unm) => username = unm"
              @pwd="(pwd) => password = pwd"/>
    </dev>
    <dev v-else>
      <SignUp @Nosign="(flag) => accountFlag = flag"
              @unm="(unm) => username = unm"
              @pwd="(pwd) => password = pwd"/>
    </dev>

  </div>

  <h1>Welcome to E-Shop!</h1>
  <button @click="component = 'customer'">shop</button>
  <button @click="component = 'merchant'">my store</button>

  <!--  place to get account information  -->
  <dev>
    <dev v-if="username == ''">
      <button @click="Sign = true, accountFlag = true">SignIn</button>
      <button @click="Sign = false, accountFlag = true">SignUp</button>
    </dev>
    <dev v-else>hi, customer {{ username }}</dev>
  </dev>

  <!--  place to display e-shop or store-->
  <dev>
    <dev v-if="component == 'customer'">
      <Customer :username="username"
      :password="password"/>
    </dev>
    <dev v-else>
      <div v-if="username == ''">
        <h4>Please Sign In !</h4>
      </div>
      <div v-else>
        <Merchant :username="username"
        :password="password"/>
      </div>
    </dev>

  </dev>
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

</style>