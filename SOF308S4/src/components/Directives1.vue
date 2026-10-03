<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>DIRECTIVES </h1>
    <p>Click vào button để xem kết quả</p>
    <button class="btn btn-info" v-on:click="showInfo">Click</button>
  </div>
</template>

<style scoped>

</style>
<script>
    export default{
      methods: {
        showInfo: function(){
            alert('Bạn vừa click vào button')
          }
      }
    }
</script>