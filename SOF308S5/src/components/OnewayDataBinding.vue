<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>ONE-WAY DATA BINDING </h1>
    <p>
       Name: <input type="text" :value="name"> 
      <!-- Name: <input type="text" v-bind:value="name"> -->
    </p>
    <a class = 'btn btn-primary' :href="url">click me</a>
  </div>
</template>

<style scoped>

</style>
<script>
  export default {
    data() {
      return {
        name: 'VueJS abc',
        url: 'https://www.google.com/',
     	}
    }
  }

</script>