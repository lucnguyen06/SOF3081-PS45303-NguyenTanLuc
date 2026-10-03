<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>TWO-WAY DATA BINDING </h1>
    <input type="text" v-model="userName">
    <p>Xin chào: {{ userName }}</p>
  </div>
</template>

<style scoped>

</style>
<script>
  export default {
    data() {
        return {
           userName: 'VueJS'
        }
    }
  }

</script>