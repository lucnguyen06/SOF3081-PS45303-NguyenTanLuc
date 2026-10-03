<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>STYLE BINDING</h1>
    <div :style="{ color: textColor, fontSize: fontSize + 'px' }">Object Style Binding</div>
    <button class="btn btn-dark" @click="changeStyle">Change Style</button>
  </div>
</template>

<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const textColor = ref('green');
      const fontSize = ref(16);

      const changeStyle = () => {
        textColor.value = textColor.value === 'green' ? 'red' : 'green';
        fontSize.value = fontSize.value === 16 ? 20 : 16;
      };
      return{textColor,fontSize,changeStyle}; 
    }
  };
</script>

<style>
  
</style>