<script setup>
import {ref} from "vue";
import router from "@/router";
// import accountAPI from "../services/accountAPI"

let Username = ref('')
let Password1 = ref('')
let Password2 = ref('')
let unmerrorMessage = ref("")
let pwderrorMessage = ref("")
let userid = ref(0)
let user = ref('')

function Sign() {
  unmerrorMessage.value = '';
  pwderrorMessage.value = '';
  if (Password1.value != Password2.value) {
    console.log("not match");
    pwderrorMessage.value = "Sorry! The password don't match!";
  }
  if (Password1.value == Password2.value) {
    console.log("matched");
    // try {
    //   const response = accountAPI.signup(Username.value, Password1.value)
    //   console.log(response);
    //   console.log("ok");
    //   userid.value = response.data.userId;
      router.push(`/ModeChoose/${userid.value}`);
  //   } catch (error) {
  //     console.log(error);
  //     console.log("error");
  //     unmerrorMessage.value = "Sorry! The username have been taken!";
  //   }
  }
}
</script>

<template>
  <h2>Sign up</h2>
  <br>
  <h4>Start your exciting fight journey by signing up!</h4>
  <br>
  <div id="app">
    <input type="radio" v-model="user" value="Customer"/><label>customer</label>
    <input type="radio" v-model="user" value="Merchant"/><label>merchant</label>
<!--    <p>{{ user }}</p>-->
  </div>
  <br>
  <p> Username: <input v-model="Username" placeholder="Username"></p>
  <p> Input your Password: <input type="password" v-model="Password1" placeholder="Password"></p>
  <p> Config your Password: <input type="password" v-model="Password2" placeholder="Password"></p>
  <p class="ErrorMsg" v-if="pwderrorMessage">{{ pwderrorMessage }}</p>
  <p class="ErrorMsg" v-if="unmerrorMessage">{{ unmerrorMessage }}</p>
  <br>
  <button class="Signbutton" @click="Sign">Sign up</button>
  <!--  <button class="Signbutton" @click="">Quit</button>-->
  <!--  <p>{{ Password1 }}{{ Password2 }}</p>-->
</template>

<style scoped>
.Signbutton {
  height: 35px;
  width: 150px;
  line-height: 23px;
  font-weight: bold;
  font-size: 22px;
  background: #accbea;
  color: #2c3e50;
  border: 1px solid transparent;
//border: 1px solid #164bde; padding: 0 10px; margin: 2px;
}

.ErrorMsg {
  color: red;
}
</style>