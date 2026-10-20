<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>METHOD HANDLERS</h1>
    <button class="btn btn-dark m-5" @click="addNumber">Thêm</button>
    <p>Số lượng: <span class="text-danger">{{ count }}</span></p>
    <hr>
    <div>
    <!--<button class="btn btn-dark" @click="() => handleClick('Hello')">Click me</button> -->
    <button class="btn btn-dark" @click.ctrl="() => handleClick('Hello')">Click me</button>
  </div>
  </div>
</template>

<style scoped>

</style>
<script setup>
  import { ref } from 'vue'
  const count = ref(0);
  const addNumber = () => {
    count.value += 1;
  };
  //--------------
  const handleClick = (message) => {
  alert(message);
  };
</script>