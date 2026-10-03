<template>
    <div class="bg-primary p-3 rounded text-center text-light mb-3">
      <h1>ATTRIBUTES</h1>
      <h2 v-bind:class="className" v-bind:style="styleData" v-html="content"></h2>
    </div>
  </template>
  

  <script>
      export default{
          data(){
              return {
                  content: 'Xin chào các bạn!',
                  className: 'text-red',
                  styleData: 'font-size: 5rem'
              }
          }
      }
  </script>

<style scoped>
  .text-red{color: red;}
</style>