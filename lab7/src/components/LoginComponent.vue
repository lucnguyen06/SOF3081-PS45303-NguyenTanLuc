<template>
  <div class="p-4 border rounded-3 bg-white shadow-sm">
    <h4 class="fw-bold text-primary mb-3">Đăng Nhập</h4>
    <p class="text-muted small mb-4">Vui lòng nhập tên đăng nhập và mật khẩu để tham gia bình luận.</p>

    <form @submit.prevent="handleLogin">
      <!-- Tên đăng nhập -->
      <div class="mb-3">
        <label for="username" class="form-label fw-semibold">Tên đăng nhập:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="form-control"
          placeholder="Nhập tên đăng nhập (ví dụ: Mai, Nam...)"
          autocomplete="username"
        />
        <div v-if="errorMsg && !username" class="text-danger small mt-1">
          Vui lòng nhập tên đăng nhập!
        </div>
      </div>

      <!-- Mật khẩu -->
      <div class="mb-3">
        <label for="password" class="form-label fw-semibold">Mật khẩu:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="form-control"
          placeholder="Nhập mật khẩu"
          autocomplete="current-password"
        />
        <div v-if="errorMsg && !password" class="text-danger small mt-1">
          Vui lòng nhập mật khẩu!
        </div>
      </div>

      <button type="submit" class="btn btn-primary w-100 py-2 fw-semibold">
        Đăng Nhập
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const errorMsg = ref(false);

const emit = defineEmits(['loggedIn']);

function handleLogin() {
  if (username.value.trim() && password.value) {
    errorMsg.value = false;
    // Kích hoạt sự kiện loggedIn với dữ liệu tên người dùng
    emit('loggedIn', username.value.trim());
  } else {
    errorMsg.value = true;
  }
}
</script>
