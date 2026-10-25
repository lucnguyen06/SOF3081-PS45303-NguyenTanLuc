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
          <div class="d-grid mb-3">
            <button type="submit" class="btn btn-success fw-semibold py-2">
              Login
            </button>
          </div>
        </form>

        <!-- Phần quản lý tài khoản JSON (db.json) -->
        <div class="border-top pt-3 mt-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="small text-muted fw-bold">📁 Dữ liệu tài khoản (db.json):</span>
            <button 
              type="button" 
              class="btn btn-link btn-sm p-0 text-decoration-none"
              @click="showRegister = !showRegister"
            >
              {{ showRegister ? 'Đóng form' : '+ Thêm tài khoản mới' }}
            </button>
          </div>

          <!-- Form tạo tài khoản mới lưu vào db.json -->
          <div v-if="showRegister" class="p-2 mb-3 bg-light rounded border small">
            <h6 class="fw-bold mb-2">Tạo tài khoản mới (Lưu vào db.json):</h6>
            <div class="mb-2">
              <input 
                type="text" 
                class="form-control form-control-sm" 
                v-model="newUsername" 
                placeholder="Tên đăng nhập mới"
              />
            </div>
            <div class="mb-2">
              <input 
                type="password" 
                class="form-control form-control-sm" 
                v-model="newPassword" 
                placeholder="Mật khẩu"
              />
            </div>
            <div class="mb-2">
              <input 
                type="text" 
                class="form-control form-control-sm" 
                v-model="newFullName" 
                placeholder="Họ và tên hiển thị"
              />
            </div>
            <button 
              type="button" 
              class="btn btn-sm btn-primary w-100" 
              @click="handleRegister"
            >
              Lưu tài khoản vào db.json
            </button>
          </div>

          <!-- Danh sách tài khoản mẫu có sẵn trong JSON -->
          <div class="small text-muted">
            <div class="fw-semibold mb-1">Tài khoản mẫu trong db.json:</div>
            <div class="d-flex flex-wrap gap-1">
              <button
                v-for="acc in db.accounts"
                :key="acc.id"
                type="button"
                class="btn btn-sm btn-outline-secondary py-0 px-2"
                style="font-size: 0.78rem;"
                @click="fillAccount(acc.username, acc.password)"
              >
                {{ acc.username }} / {{ acc.password }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authState, login, logout, register } from '../utils/auth';
import { dbState } from '../utils/dbService';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      successMessage: '',
      auth: authState,
      db: dbState,
      showRegister: false,
      newUsername: '',
      newPassword: '',
      newFullName: ''
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

      // Xác thực dựa trên danh sách accounts trong db.json
      const result = login(this.username, this.password);
      if (result.success) {
        this.$router.push(this.redirectTarget);
      } else {
        this.errorMessage = result.message;
      }
    },
    async handleRegister() {
      if (!this.newUsername.trim() || !this.newPassword.trim()) {
        this.errorMessage = 'Vui lòng nhập tên đăng nhập và mật khẩu!';
        return;
      }

      const res = await register({
        username: this.newUsername,
        password: this.newPassword,
        fullName: this.newFullName
      });

      if (res.success) {
        this.successMessage = `Đã tạo tài khoản "${this.newUsername}" và lưu vào db.json!`;
        this.username = this.newUsername;
        this.password = this.newPassword;
        this.newUsername = '';
        this.newPassword = '';
        this.newFullName = '';
        this.showRegister = false;
        this.errorMessage = '';
      } else {
        this.errorMessage = res.message;
      }
    },
    fillAccount(u, p) {
      this.username = u;
      this.password = p;
      this.errorMessage = '';
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
