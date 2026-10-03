<template>
    <div class="bg-primary p-3 rounded text-center text-light mb-3">
      <h1>EXPRESSIONS:</h1>
      <p>Phương thức sayHi trả về: {{ sayHi() }}</p>
      <p> Số này là số {{ number%2==0?'Chẵn':'Lẻ' }}</p>
    </div>
  </template>
  

  <script>
      export default {
      data() {
          return {
            number : 23
          }
        },
        methods: {
          sayHi : function () {
            return 'vuejs.org'
          }
        }
      }
  </script>

<style scoped>

</style>