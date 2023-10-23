<template>
  <div v-if="buyState" class="selectedItem">
    <n-card title="带封面的卡片">
      <template #cover>
        <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg">
      </template>
      卡片内容

  
    </n-card>
    <n-input :style="{ width: '33%' }" placeholder="Address" />
    <n-input-number :style="{ width: '33%' }" placeholder="Quantity" />
    <n-button @click="notBuy" size="large" > back </n-button>
    <n-button @click="finishBuy" size="large" > buy </n-button>
  </div>
  <div v-else>
    <n-card title="带封面的卡片">
      <template #cover>
        <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg">
      </template>
      卡片内容
      <n-button @click="jumpToBuy" size="large" Buy> buy </n-button>
  
    </n-card>
  </div>
</template>


<script>
import { defineComponent ,ref} from "vue";
import { useMessage } from "naive-ui";

export default defineComponent({
  setup() {
    const buyState = ref(false)

    return {
      buyState,
      finishBuy(){      
        buyState.value = false
      },
      jumpToBuy() {
        buyState.value = true
        console.log(buyState)
      },
      notBuy(){
        buyState.value =false
      }
    };
  }
});
</script>





<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.selectedItem{
  width: 100%;
  height: 80vh;
  background-color: rgba(200, 200,200, 0.77);
  z-index: 10;
  display: flex;
  flex-direction:row;
  align-items: center;

  box-sizing: border-box; 
  padding: 20px;  
}
</style>
