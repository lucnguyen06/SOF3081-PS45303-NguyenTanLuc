<template>
  <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h2 class="mb-4">Quản lý Sinh viên - Emit</h2>
    <!-- Form thêm sinh viên mới -->
    <form class="col-sm-8" @submit.prevent="sendEvent">
      <div class="form-group">
        <label for="name">Tên sinh viên</label>
        <input type="text" v-model="newStudent.name" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="age">Tuổi</label>
        <input type="number" v-model="newStudent.age" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-success mt-2">Thêm sinh viên</button>
    </form>
  </div>
</template>

<style scoped>

</style>
<script setup>
  import { ref } from 'vue';
  const lisSV = ref([]);
  const emit = defineEmits(['my-event']);
  // Dữ liệu sinh viên mới
  const newStudent = ref({name: '',age: null});
  const sendEvent = () =>{
    // Thêm sinh viên vào danh sách
    lisSV.value.push({ 
            name: newStudent.value.name, 
            age: newStudent.value.age 
          });
    // Reset form sau khi thêm
    newStudent.value.name = '';
    newStudent.value.age = null;
    //Phat ra su kien day du lieu qua component cha
    emit('my-event',lisSV);
  };       
</script>