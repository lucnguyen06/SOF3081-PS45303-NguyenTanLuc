<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>interpolation:</h1>
    <h2>{{message}}</h2>
    <h2>{{number + 5}}</h2>
    <h2>{{sayHi()}}</h2>
  </div>
</template>
  
<script>
    export default {
      data() {
        return {
            message: "Xin chào VueJS ",
            number: 20
        }
      },
      methods:{
        sayHi(){
            return 'Đây là một phương thức'
        }
      }
    }
</script>


