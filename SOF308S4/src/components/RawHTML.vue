<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>RAW HTML</h1>
    <h2 v-html="content"></h2>
  </div>
</template>

<style scoped>

</style>
<script>
    export default{
        data(){
            return {
                content: 'Xin chào các bạn!'
            }
        }
    }
</script>