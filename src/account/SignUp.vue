<script setup>
import {defineEmits, ref} from "vue";
// import router from "@/router";
import accountAPI from "../services/accountAPI"

let username = ref('')
let password1 = ref('')
let password2 = ref('')
let unmerrorMessage = ref("")
let pwderrorMessage = ref("")

const emit = defineEmits(['Nosign', 'unm', 'pwd'])

function Sign() {
  unmerrorMessage.value = '';
  pwderrorMessage.value = '';
  if (password1.value != password2.value) {
    console.log("not match");
    pwderrorMessage.value = "Sorry! The password don't match!";
  }
  if (password1.value == password2.value) {
    console.log("matched");
    try {
      const response = accountAPI.signup(username.value, password1.value)
      console.log(response);
      emit('unm', username.value)
      emit('pwd', password1.value)
      emit('Nosign', false);
    } catch (error) {
      console.log(error);
      unmerrorMessage.value = "Sorry! The username have been taken!";
    }
  }
}

function NoSign(){
  emit('Nosign', false);
}
</script>

<template>
  <h2 class="backfont" >Sign up</h2>
  <br>
  <h4 class="backfont">Start your exciting fight journey by signing up!</h4>
  <br>
  <div id="app">
    <!--    <p>{{ user }}</p>-->
  </div>
  <br>
  <p class="backfont"> Username: <input v-model="username" placeholder="Username"></p>
  <p class="backfont"> Input your Password: <input type="password" v-model="password1" placeholder="Password"></p>
  <p class="backfont"> Config your Password: <input type="password" v-model="password2" placeholder="Password"></p>
  <p class="ErrorMsg" v-if="pwderrorMessage">{{ pwderrorMessage }}</p>
  <p class="ErrorMsg" v-if="unmerrorMessage">{{ unmerrorMessage }}</p>
  <br>
  <button class="Signbutton" @click="Sign">Sign up</button>
  <!--  <button class="Signbutton" @click="">Quit</button>-->
  <!--  <p>{{ Password1 }}{{ Password2 }}</p>-->

  <button class="Signbutton" @click="NoSign">Quit</button>
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
padding: 0 10px; margin: 2px;
}

.ErrorMsg {
  color: red;
}

.backfont{
  color: azure;
}
</style>