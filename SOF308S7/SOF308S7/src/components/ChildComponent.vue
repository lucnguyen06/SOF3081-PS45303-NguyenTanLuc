<template>
    <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>defineEmits</h1>
    <div>
        <button @click="sendEvent" class="btn btn-success">Click me</button>
    </div>
  </div>
</template>

<script setup>
  const emit = defineEmits(['my-event']);
  const sendEvent=() =>{
    emit('my-event','Dữ liệu từ phía component con');
  }
</script>

<style scoped>

</style>