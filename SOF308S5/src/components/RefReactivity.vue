<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>REF</h1>
    <div>{{ count }}</div>
    <button @click="increment">Increment</button>
  </div>
</template>

<style scoped>

</style>
<script>
  import {ref} from 'vue';
  export default {
    setup(){
      const count = ref(0);
      const increment = () =>{
        count.value++;
      };
      return {count, increment};
    }
  };

</script>