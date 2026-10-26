<template>
  <div class="login-container d-flex flex-column align-items-center py-3">
    <div class="card border-0 shadow-sm" style="width: 100%; max-width: 400px;">
      <div class="card-body p-4">
        <!-- Tiêu đề Form Login theo Hình 2 -->
        <h2 class="text-center fw-bold mb-4">Login</h2>

        <!-- Thông báo cảnh báo khi bị chặn bởi Route Guard -->
        <div v-if="redirectReason" class="alert alert-warning py-2 px-3 small mb-3">
          <strong>Thông báo:</strong> Vui lòng đăng nhập để truy cập trang Quản lý sinh viên.
        </div>

        <!-- Thông báo lỗi nhập liệu -->
        <div v-if="errorMessage" class="alert alert-danger py-2 px-3 small mb-3">
          {{ errorMessage }}
        </div>

        <!-- Thông báo thành công khi tạo tài khoản -->
        <div v-if="successMessage" class="alert alert-success py-2 px-3 small mb-3">
          {{ successMessage }}
        </div>

        <!-- Trạng thái nếu đã đăng nhập -->
        <div v-if="auth.isAuthenticated" class="alert alert-success text-center py-2 mb-3">
          <p class="small mb-1">Bạn đã đăng nhập: <strong>{{ auth.username }}</strong></p>
          <div class="d-flex justify-content-center gap-2 mt-2">
            <button class="btn btn-sm btn-primary" @click="goToQLSinhVien">
              Vào QL Sinh viên
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="handleLogout">
              Đăng xuất
            </button>
          </div>
        </div>

        <!-- Form đăng nhập theo đúng Hình 2 -->
        <form v-else @submit.prevent="handleLogin">
          <!-- Username field -->
          <div class="mb-3">
            <label class="form-label fw-semibold">Username</label>
            <input
              type="text"
              class="form-control"
              v-model="username"
              placeholder="Nhap username"
            />
          </div>

          <!-- Password field -->
          <div class="mb-4">
            <label class="form-label fw-semibold">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Nhap password"
            />
          </div>

          <!-- Nút bấm Login màu xanh lá theo Hình 2 -->
          <div class="d-grid">
            <button type="submit" class="btn btn-success fw-semibold py-2">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { authState, login, logout } from '../utils/auth';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      successMessage: '',
      auth: authState
    };
  },
  computed: {
    redirectTarget() {
      return this.$route.query.redirect || '/quan-ly-sinh-vien';
    },
    redirectReason() {
      return !!this.$route.query.redirect;
    }
  },
  methods: {
    handleLogin() {
      this.errorMessage = '';
      this.successMessage = '';

      // Bài 2: Validation kiểm tra thông tin đăng nhập
      if (!this.username.trim() || !this.password.trim()) {
        this.errorMessage = 'Vui lòng nhập đầy đủ Username và Password!';
        return;
      }

      // Xác thực đăng nhập
      const result = login(this.username, this.password);
      if (result.success) {
        this.$router.push(this.redirectTarget);
      } else {
        this.errorMessage = result.message;
      }
    },
    handleLogout() {
      logout();
      this.username = '';
      this.password = '';
      this.errorMessage = '';
    },
    goToQLSinhVien() {
      this.$router.push('/quan-ly-sinh-vien');
    }
  }
};
</script>

<style scoped>
.login-container {
  min-height: 380px;
}
</style>
