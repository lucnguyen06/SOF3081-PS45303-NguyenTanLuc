<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h1>Reactive Demo</h1>
    <h4>Tài khoản: {{ user.name }}</h4>
    <h4>Vai trò: {{ user.role }}</h4>
    <button class="btn btn-danger" @click="updateUser">Cập nhật</button>
  </div>
</template>

<style scoped>

</style>
<script>
  import {reactive} from "vue";
  export default {
    setup(){
      //Tạo 1 reactive object user
      const user = reactive({name:"Kien", role:"Admin"});
      const updateUser=()=>{
        user.name="KienDN";
        user.role="Nhân viên";
      };
      return{user, updateUser};
    },
  };
</script>