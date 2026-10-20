<script setup>
  import ChildSinhvien from './ChildSinhvien.vue';
  import { ref } from 'vue';
  const students = ref([]);
  const getData = (data) => {
    console.log(data.value);
    students.value = data.value;
  };
</script>

<template>
    <ChildSinhvien @my-event="getData"/>
    <div class="bg-primary p-3 rounded text-center text-light mb-3">
      <h2 class="mb-4">Danh sách Sinh viên - Emit</h2>
      <ul class="list-group">
        <li class="list-group-item" v-for="(student, index) in students" >
          {{ index + 1 }}, {{ student.name }} - {{ student.age }} tuổi
        </li>
      </ul>
   </div>

</template>

<style scoped>

</style>
