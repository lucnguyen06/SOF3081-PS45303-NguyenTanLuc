<template>
    <div>
        <h1>Dashboard </h1>  
        <button @click="removeLogin">Logout</button>  
        <p>Welcome to you dashboard. This are is protected and requires</p>
    </div>
        <div class="bg-primary p-3 rounded text-center text-light mb-3">
    <h2 class="mb-4">Quản lý Sinh viên</h2>
    <!-- Form thêm sinh viên mới -->
    <form class="col-sm-8" @submit.prevent="addStudent">
      <h3 class="mb-4 text-success">Thêm sinh viên</h3>
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
    <hr>
    <!-- Danh sách sinh viên -->
    <div class="col-sm-8">
    <h3 class="mb-4 text-danger">Danh sách sinh viên</h3>
    <ul class="list-group">
      <li class="list-group-item" v-for="(student, index) in students" >
        {{ student.name }} - {{ student.age }} tuổi
      </li>
    </ul>
    </div>
  </div>
    
</template>
<script>


import { ref } from 'vue';
export default{
 name: 'Dashboard',
  data() {
    return {
     
    };
  },
  mounted() {
    // Kiểm tra dữ liệu đã lưu trong LocalStorage khi ứng dụng tải
    const data = localStorage.getItem('loginData');
    if (data) {
      this.storedData = JSON.parse(data);
    }
  },
  methods: {
    removeLogin() {    
      localStorage.removeItem('loginData');      
      alert('Bye!');
      this.$router.push({name: 'Login'});
    },
  },
  setup() {
        // Danh sách sinh viên 
        const students = ref([
          { name: 'Trần Quang Anh', age: 18 },
          { name: 'Lê Thị Lan', age: 19 },
          { name: 'Phạm Văn Bảo', age: 18 }
        ]);

        // Dữ liệu sinh viên mới
        const newStudent = ref({
          name: '',
          age: null
        });
         // Phương thức thêm sinh viên
      const addStudent = () => {
        if (newStudent.value.name && newStudent.value.age > 0){
          // Thêm sinh viên vào danh sách
          students.value.push({ 
            name: newStudent.value.name, 
            age: newStudent.value.age 
          });

          // Reset form sau khi thêm
          newStudent.value.name = '';
          newStudent.value.age = null;
          }
        };

        return { students, newStudent, addStudent };
      }
}; 
</script>