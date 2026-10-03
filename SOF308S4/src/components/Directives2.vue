<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>DIRECTIVES </h1>
    <p>{{ message }}</p>
    <button class="btn btn-info" @click="showInfo">Click</button>
  </div>
</template>

<style scoped>

</style>
<script>
    export default{
      data() {
        return {
            message: 'qua lại khách chờ sông lặn sóng',
        }
      },
      methods: {
          showInfo: function(){
              this.message = this.message.split(' ').reverse().join(' ');
          }
      }

    }
</script>