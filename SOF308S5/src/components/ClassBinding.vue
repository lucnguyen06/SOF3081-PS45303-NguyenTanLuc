<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>CLASS BINDING</h1>
    <div :class="{active: isActive, 'text-danger':hasError}">Hello world</div>
    <div :class="[activeClass, errorClass]">Hello World!</div>
  </div>
</template>

<style scoped>

</style>
<script>
  import {ref} from'vue';
  export default {
    setup(){
      const isActive = ref(true);
      const hasError = ref(true);

      const activeClass = ref('active');
      const errorClass = ref('text-danger');
      
      return {isActive,hasError,activeClass,errorClass};
    }
  };

</script>