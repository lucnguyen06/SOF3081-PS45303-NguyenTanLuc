<template>
  <div id="app" class="container py-4">
    <!-- Tiêu đề thương hiệu môn học SOF308 theo đúng Hình 1 và Hình 2 -->
    <header class="text-center mb-3">
      <h1 class="top-brand mb-2">SOF308</h1>

      <!-- Thanh điều hướng liên kết: Home -- QL Sinh vien theo đúng Hình 1 & Hình 2 -->
      <nav class="nav-links-bar d-flex justify-content-center align-items-center mb-3">
        <router-link to="/" class="fw-semibold">Home</router-link>
        <span class="nav-separator">--</span>
        <router-link to="/quan-ly-sinh-vien" class="fw-semibold">QL Sinh vien</router-link>

        <!-- Trạng thái đăng nhập và nút đăng xuất tiện ích -->
        <template v-if="auth.isAuthenticated">
          <span class="nav-separator">|</span>
          <span class="badge bg-success-subtle text-success border border-success-subtle me-2">
            👤 {{ auth.username }}
          </span>
          <button class="btn btn-sm btn-outline-secondary py-0 px-2" @click="handleLogout">
            Đăng xuất
          </button>
        </template>
        <template v-else>
          <span class="nav-separator">|</span>
          <router-link to="/login" class="text-secondary small">
            Đăng nhập
          </router-link>
        </template>
      </nav>
      <hr class="my-3 opacity-25" />
    </header>

    <!-- Nội dung của view hiện tại -->
    <main>
      <router-view></router-view>
    </main>

    <!-- Footer thông tin sinh viên -->
    <footer class="text-center mt-5 pt-3 border-top text-muted small">
      <p class="mb-1">
        <strong>SOF308 - Xây dựng giao diện tương tác Backend</strong> | Đề kiểm tra Final
      </p>
      <p class="mb-0">
        Sinh viên: <strong>Nguyễn Tấn Lực</strong> | MSSV: <strong>PS45303</strong>
      </p>
    </footer>
  </div>
</template>

<script>
import { authState, logout } from './utils/auth';

export default {
  name: 'App',
  data() {
    return {
      auth: authState
    };
  },
  methods: {
    handleLogout() {
      logout();
      alert('Đã đăng xuất thành công!');
      // Nếu đang ở trang được bảo vệ thì chuyển về login hoặc home
      if (this.$route.meta.requiresAuth) {
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style scoped>
#app {
  max-width: 900px;
}
</style>
