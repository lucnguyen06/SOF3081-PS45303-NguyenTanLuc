<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>CLASS BINDING ARRAY</h1>
    <div :class="[isActive ? 'baseStyle' : '', 'text-success', 'text-center']">Hello World</div>
  </div>
</template>

<script>
  import {ref} from'vue';
  export default {
    setup() {
      const isActive = ref(true);
      return { isActive };
    }
  };
</script>

<style>
  .baseStyle {
  font-size: '20px';
  border: 2px dashed darkred;
  }
</style>