<script setup>
import {ref, defineEmits} from "vue";
import accountAPI from "../services/accountAPI"

let username = ref('')
let password = ref('')
let verifyerrorMessage = ref("")
let emptyerrorMessage = ref("")

const emit = defineEmits(['Nosign', 'unm', 'pwd'])

function log() {
  verifyerrorMessage.value = ''
  emptyerrorMessage.value = ''
  if (username.value == '' & password.value == '') {
    emptyerrorMessage.value = 'Please input the username and password'
  } else {
    try {
      const response = accountAPI.login(username.value, password.value)
      console.log(response);
      console.log("ok");
      emit('unm', username.value)
      emit('pwd', password.value)
      emit('Nosign', false);
    } catch (error) {
      console.log(error);
      verifyerrorMessage.value = "Sorry! The username and the password don't match!";
    }
  }
}

function NoSign(){
  emit('Nosign', false);
}

</script>

<template>


    <h2 class="backfont">Log in</h2>
    <br>
    <h4 class="backfont" >Continue your food Shopping!</h4>
    <br>
    <p class="backfont"> Username: <input v-model="username" placeholder="Username"></p>
    <p class="backfont"> Password: <input type="password" v-model="password" placeholder="Password"></p>
    
    <p v-if="emptyerrorMessage" style="color: red">{{ emptyerrorMessage }}</p>
    <p v-if="verifyerrorMessage" style="color: red">{{ verifyerrorMessage }}</p>
    <!--  <p v-else>{{ }}</p>-->
    
    <button class="Signbutton" @click="log">Log in</button>
    
    <button class="Signbutton" @click="NoSign">Quit</button>

</template>

<style>

.Signbutton {
  height: 35px;
  width: 150px;
  line-height: 23px;
  font-weight: bold;
  font-size: 22px;
  background: #accbea;
  color: #2c3e50;
  border: 1px solid transparent;
  border: 1px solid #164bde;
  padding: 0 10px;
  margin: 2px;
}

.backfont{
  color: azure;
  font-size: 40px;
}
</style>