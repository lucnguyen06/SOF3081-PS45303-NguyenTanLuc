<template>
  <div class="login-view row justify-content-center">
    <div class="col-md-6 col-lg-5">
      <!-- Thông báo nếu được chuyển hướng từ route được bảo vệ -->
      <div v-if="redirectReason" class="alert alert-warning shadow-sm border-0 mb-4">
        <h6 class="fw-bold mb-1">Yêu cầu xác thực!</h6>
        <p class="small mb-0">
          Bạn cần đăng nhập trước khi có thể truy cập <code>{{ redirectTarget }}</code> 
          (Tuyến đường được bảo vệ bởi <strong>Navigation Guard</strong>).
        </p>
      </div>

      <div class="card shadow border-0">
        <div class="card-header bg-primary text-white text-center py-4">
          <h3 class="fw-bold mb-1">Đăng nhập MyBlog</h3>
          <p class="small mb-0 opacity-75">Trang xác thực giả lập cho hệ thống Route Guard</p>
        </div>

        <div class="card-body p-4">
          <!-- Thông báo nếu đã đăng nhập rồi -->
          <div v-if="auth.isAuthenticated" class="alert alert-success text-center">
            <h6 class="fw-bold mb-1">Bạn đã đăng nhập rồi!</h6>
            <p class="small mb-2">Tài khoản hiện tại: <strong>{{ auth.user.username }}</strong></p>
            <button class="btn btn-sm btn-success me-2" @click="goToDashboard">
              Vào Dashboard ngay
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="handleLogout">
              Đăng xuất
            </button>
          </div>

          <!-- Form đăng nhập -->
          <form v-else @submit.prevent="handleLogin">
            <div class="mb-3">
              <label class="form-label fw-semibold">Tên đăng nhập / Email:</label>
              <input 
                type="text" 
                class="form-control" 
                v-model="username" 
                placeholder="Nhập tên đăng nhập" 
                required 
              />
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">Mật khẩu:</label>
              <input 
                type="password" 
                class="form-control" 
                v-model="password" 
                placeholder="Nhập mật khẩu" 
                required 
              />
            </div>

            <div class="alert alert-light border small text-muted">
              Gợi ý: Nhập bất kỳ thông tin nào hoặc bấm <strong>"Đăng nhập giả lập nhanh"</strong> 
              để cập nhật biến <code>isAuthenticated = true</code>.
            </div>

            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary py-2 fw-semibold">
                Đăng nhập (Cập nhật isAuthenticated & $router.push)
              </button>
              <button 
                type="button" 
                class="btn btn-outline-success py-2"
                @click="quickLogin"
              >
                1-Click Giả lập đăng nhập nhanh
              </button>
            </div>
          </form>
        </div>

        <div class="card-footer bg-light text-center py-3 text-muted small">
          SOF3081 - Lab 8 | Sinh viên: Nguyễn Tấn Lực (PS45303)
        </div>
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
      username: 'nguyentanluc',
      password: '••••••••',
      auth: authState
    };
  },
  computed: {
    redirectTarget() {
      return this.$route.query.redirect || '/dashboard';
    },
    redirectReason() {
      return !!this.$route.query.redirect;
    }
  },
  methods: {
    handleLogin() {
      // Cập nhật biến isAuthenticated theo yêu cầu 3c & 3
      login(this.username, this.password);

      // Điều hướng lập trình đến Dashboard sau khi đăng nhập thành công (Yêu cầu 3 & 3d)
      this.$router.push({ name: 'Dashboard' });
    },
    quickLogin() {
      login('admin', '123456');
      this.$router.push({ name: 'Dashboard' });
    },
    handleLogout() {
      logout();
    },
    goToDashboard() {
      this.$router.push({ name: 'Dashboard' });
    }
  }
};
</script>

<style scoped>
.login-view {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
