<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>Listen to Events</h1>
    <div>
    <button class="btn btn-dark" @click="count++">count is {{ count }}</button>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup>
  import {ref} from'vue';
  const count = ref(0);
</script>