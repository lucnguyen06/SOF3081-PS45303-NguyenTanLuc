<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>Key modifiers</h1>
    <div>
      <!--<input type="text" v-on:keyup.enter="warn" v-model="name"/> ... -->
      <input type="text" v-on:keyup.space="warn" v-model="name"/> ..
      <button class="btn btn-dark" @click.ctrl="handleClick">Ctrl Click </button>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup>
  import {ref} from 'vue';
  const name = ref('');
  const warn = () => {
    alert('Bạn vừa ấn Enter!, Hello: '+ name.value);
  };
  const handleClick = () => {
    alert("Ctrl click me ...");
  };
</script>