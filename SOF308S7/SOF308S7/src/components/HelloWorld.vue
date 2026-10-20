<template>
  <!--<h1>{{ msg }}  {{ name }}</h1> -->
  <h1>{{ msg }} : {{ name }}</h1>
</template>

<script setup>
    defineProps({msg: String, name: String});
    //const props = defineProps(['msg','name']);    
</script>

<style scoped>

</style>