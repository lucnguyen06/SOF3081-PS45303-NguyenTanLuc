<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>STYLE BINDING DEMO</h1>
    <div :class="{ highlighted: isHighlighted }" :style="{ backgroundColor: bgColor }">Kết hợp Class và Style Binding</div>
    <button class="btn btn-dark" @click="toggleHighlight">Toggle Highlight</button>
    <button class="btn btn-dark" @click="toggleBgColor">Toggle Background Color</button>
  </div>
</template>

<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const isHighlighted = ref(false);
      const bgColor = ref('lightgray');
      const toggleHighlight = () => {
        isHighlighted.value = !isHighlighted.value;
      };
      const toggleBgColor = () => {
        bgColor.value = bgColor.value === 'lightgray' ? 'lightpink' : 'lightgray';
      }
      return{isHighlighted,bgColor,toggleHighlight,toggleBgColor}; 
    }
  };
</script>

<style>
  .highlighted {font-weight: bold; color: darkorchid;}
</style>