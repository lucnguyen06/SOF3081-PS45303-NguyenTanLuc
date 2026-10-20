<template>
  <div class="card shadow-sm border-0">
    <div class="card-header bg-primary text-white py-3">
      <h5 class="mb-0 fw-bold">
        <i class="bi bi-shield-lock me-2"></i>Bài 2: Form Đăng nhập & Validation (v-if & Event Handling)
      </h5>
    </div>

    <div class="card-body p-4">
      <div class="row justify-content-center">
        <!-- Khi chưa đăng nhập: Hiển thị Form Đăng nhập -->
        <div v-if="!isLoggedIn" class="col-md-6 col-lg-5 p-4 border rounded-3 bg-white shadow-sm">
          <h4 class="fw-bold text-primary mb-3">Form Đăng nhập</h4>
          <p class="text-muted small mb-4">Vui lòng nhập thông tin tài khoản của bạn để đăng nhập.</p>

          <form @submit.prevent="login" novalidate>
            <!-- Trường Email -->
            <div class="mb-3">
              <label class="form-label fw-semibold">Email:</label>
              <input
                type="email"
                class="form-control"
                :class="{ 'is-invalid': emailError }"
                v-model="email"
                placeholder="Nhập email (ví dụ: user@example.com)"
              />
              <p v-if="emailError" class="text-danger small mt-1 mb-0">{{ emailError }}</p>
            </div>

            <!-- Trường Mật khẩu -->
            <div class="mb-4">
              <label class="form-label fw-semibold">Mật khẩu:</label>
              <input
                type="password"
                class="form-control"
                :class="{ 'is-invalid': passwordError }"
                v-model="password"
                placeholder="Nhập mật khẩu"
              />
              <p v-if="passwordError" class="text-danger small mt-1 mb-0">{{ passwordError }}</p>
            </div>

            <!-- Nút Đăng nhập sử dụng @submit.prevent -->
            <button type="submit" class="btn btn-primary w-100 py-2 fw-semibold">
              Đăng nhập
            </button>
          </form>
        </div>

        <!-- Khi đăng nhập thành công: Hiển thị Màn hình chào mừng -->
        <div v-else class="col-md-6 col-lg-5 p-4 border rounded-3 bg-white shadow-sm text-center">
          <div class="mb-3 text-success">
            <span class="fs-1">🎉</span>
          </div>
          <h3 class="fw-bold text-success mb-2">Chào mừng, {{ email }}!</h3>
          <p class="text-muted mb-4">Bạn đã đăng nhập thành công vào hệ thống.</p>
          <button @click="logout" class="btn btn-outline-danger px-4 py-2 fw-semibold">
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Trạng thái đăng nhập
const isLoggedIn = ref(false);

// Dữ liệu nhập vào
const email = ref('');
const password = ref('');

// Thông báo lỗi
const emailError = ref('');
const passwordError = ref('');

// Biểu thức chính quy kiểm tra định dạng email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Hàm xử lý đăng nhập
const login = () => {
  // Reset thông điệp lỗi
  emailError.value = '';
  passwordError.value = '';

  // Validate email
  if (!email.value) {
    emailError.value = 'Email là bắt buộc.';
  } else if (!emailRegex.test(email.value)) {
    emailError.value = 'Vui lòng nhập email hợp lệ.';
  }

  // Validate mật khẩu
  if (!password.value) {
    passwordError.value = 'Mật khẩu là bắt buộc.';
  }

  // Nếu không có lỗi, xử lý login
  if (!emailError.value && !passwordError.value) {
    isLoggedIn.value = true;
  }
};

// Hàm xử lý đăng xuất
const logout = () => {
  isLoggedIn.value = false;
  email.value = '';
  password.value = '';
  emailError.value = '';
  passwordError.value = '';
};
</script>
