<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>REACTIVIE OBJECT</h1>
    <div>{{ state.count }}</div>
    <div>{{ state.user.name }}</div>
    <button @click="increment">Increment</button>
  </div>
</template>

<style scoped>

</style>
<script>
  import {reactive} from 'vue';
  export default {
    setup(){
      const state = reactive({
        count:0,
        user:{
          name:'John',
          age:25
        }  
      });
      const increment=()=> {
        state.count++;
      }
      return {state, increment};
    }
  };
</script>