<template>
  <div class="card shadow-sm border-0">
    <div class="card-body p-4">
      <div class="row justify-content-center">
        <div class="col-sm-8">
          <h1 class="fw-bold mb-4">Thông tin cá nhân</h1>
          <form @submit.prevent>
            <div class="mb-3">
              <label class="form-label fw-semibold">Họ và Tên:</label>
              <input v-model="userInfo.name" type="text" class="form-control" placeholder="Nhập họ và tên" />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Tuổi:</label>
              <input v-model="userInfo.age" type="number" class="form-control" placeholder="Nhập tuổi" />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Email:</label>
              <input v-model="userInfo.email" type="email" class="form-control" placeholder="Nhập email" />
            </div>
          </form>

          <!-- Hiển thị thông tin ngay sau khi nhập -->
          <div class="info-display mt-4 p-3 bg-dark text-white rounded">
            <h2 class="fs-5 fw-bold">Thông tin đã nhập:</h2>
            <p class="mb-1"><strong>Họ và Tên:</strong> {{ userInfo.name }}</p>
            <p class="mb-1"><strong>Tuổi:</strong> {{ userInfo.age }}</p>
            <p class="mb-0"><strong>Email:</strong> {{ userInfo.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

// Khởi tạo đối tượng thông tin người dùng sử dụng reactive để tạo reactivity
const userInfo = reactive({
  name: '',
  age: null,
  email: ''
});
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>
