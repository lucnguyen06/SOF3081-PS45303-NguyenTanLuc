<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <!-- Navbar chính sử dụng Bootstrap 5 -->
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div class="container">
          <router-link to="/" class="navbar-brand fw-bold text-primary d-flex align-items-center gap-2">
            <span class="fs-4">📝</span>
            <span class="text-white">MyBlog</span>
            <span class="badge bg-primary text-white fs-6">Lab 8</span>
          </router-link>

          <button 
            class="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link :to="{ name: 'Home' }" class="nav-link" exact-active-class="active">
                  Trang chủ
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'BlogList' }" class="nav-link" active-class="active">
                  Danh sách Blog
                </router-link>
              </li>
              <li class="nav-item">
                <!-- Điều hướng đến Profile chuẩn -->
                <router-link :to="{ name: 'UserProfile' }" class="nav-link" active-class="active">
                  Hồ sơ (/profile)
                </router-link>
              </li>
              <li class="nav-item">
                <!-- Điều hướng qua Alias Route /me -->
                <router-link to="/me" class="nav-link" :class="{ active: $route.path.startsWith('/me') }">
                  Alias (/me)
                </router-link>
              </li>
              <li class="nav-item">
                <!-- Route bảo vệ: Dashboard -->
                <router-link :to="{ name: 'Dashboard' }" class="nav-link" active-class="active">
                  Dashboard <span class="badge bg-danger ms-1">Auth</span>
                </router-link>
              </li>
            </ul>

            <!-- Phần thông tin tài khoản & xác thực phía bên phải -->
            <div class="d-flex align-items-center gap-2">
              <span v-if="auth.isAuthenticated" class="badge bg-success py-2 px-3">
                Đã đăng nhập: {{ auth.user.username }}
              </span>
              <span v-else class="badge bg-secondary py-2 px-3">
                Chưa đăng nhập (Khách)
              </span>

              <button 
                v-if="auth.isAuthenticated" 
                class="btn btn-outline-light btn-sm" 
                @click="onLogout"
              >
                Đăng xuất
              </button>
              <router-link 
                v-else 
                :to="{ name: 'Login' }" 
                class="btn btn-primary btn-sm"
              >
                Đăng nhập
              </router-link>
            </div>
          </div>
        </div>
      </nav>

      <!-- Thanh trạng thái Route Info (Minh họa trực quan hoạt động của Vue Router) -->
      <div class="bg-secondary bg-opacity-10 border-bottom py-2">
        <div class="container d-flex flex-wrap justify-content-between align-items-center small text-muted">
          <div>
            <strong>📍 Đường dẫn hiện tại:</strong> 
            <code class="text-primary fw-bold mx-1">{{ $route.fullPath }}</code>
            <span class="mx-2">|</span>
            <strong>Tên Route (Name):</strong> 
            <span class="badge bg-dark mx-1">{{ $route.name || 'N/A' }}</span>
          </div>
          <div>
            <strong>Cấu trúc Match:</strong> 
            <span class="text-dark">{{ matchedRoutes }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Nội dung chính (View) được render theo Route -->
    <main class="flex-grow-1 py-4">
      <div class="container">
        <router-view></router-view>
      </div>
    </main>

    <!-- Footer thông tin sinh viên -->
    <footer class="bg-white border-top py-4 mt-auto">
      <div class="container text-center text-muted small">
        <p class="mb-1 fw-bold text-dark">
          SOF3081 - Xây dựng Giao diện Tương tác Backend | Bài thực hành Lab 8 (Vue Router)
        </p>
        <p class="mb-0">
          Sinh viên: <strong>Nguyễn Tấn Lực</strong> - MSSV: <strong>PS45303</strong> - Lớp: <strong>SOF3081</strong>
        </p>
      </div>
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
  computed: {
    matchedRoutes() {
      return this.$route.matched
        .map(record => record.name || record.path)
        .join(' ➔ ');
    }
  },
  methods: {
    onLogout() {
      logout();
      alert('Đã đăng xuất khỏi MyBlog!');
      this.$router.push({ name: 'Home' });
    }
  }
};
</script>

<style>
/* Hiệu ứng chuyển động mượt mà cho router-view */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
