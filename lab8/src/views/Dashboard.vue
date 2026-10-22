<template>
  <div class="dashboard-view">
    <!-- Header của Dashboard -->
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom">
      <div>
        <div class="d-flex align-items-center gap-2">
          <h2 class="fw-bold text-dark mb-0">Bảng điều khiển quản trị (Dashboard)</h2>
          <span class="badge bg-danger">Route được bảo vệ</span>
        </div>
        <p class="text-muted mb-0 mt-1">
          Xin chào, <strong>{{ auth.user.name }}</strong>! Tuyến đường này được bảo vệ bởi 
          <code>beforeEach</code> Navigation Guard.
        </p>
      </div>
      <div class="mt-2 mt-md-0 d-flex gap-2">
        <button class="btn btn-outline-primary" @click="goToProfile">
          Trang cá nhân (this.$router.push)
        </button>
        <button class="btn btn-danger" @click="handleLogout">
          Đăng xuất (Logout)
        </button>
      </div>
    </div>

    <!-- Thẻ thống kê (Analytics Cards) -->
    <div class="row g-3 mb-4">
      <div class="col-sm-6 col-lg-3">
        <div class="card border-0 shadow-sm bg-primary text-white h-100">
          <div class="card-body">
            <h6 class="text-white-50 text-uppercase small">Tổng bài viết</h6>
            <h2 class="fw-bold mb-0">12</h2>
            <small class="text-white-50">+3 bài viết tuần này</small>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-3">
        <div class="card border-0 shadow-sm bg-success text-white h-100">
          <div class="card-body">
            <h6 class="text-white-50 text-uppercase small">Lượt truy cập</h6>
            <h2 class="fw-bold mb-0">1,482</h2>
            <small class="text-white-50">+15% so với tháng trước</small>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-3">
        <div class="card border-0 shadow-sm bg-info text-white h-100">
          <div class="card-body">
            <h6 class="text-white-50 text-uppercase small">Bình luận</h6>
            <h2 class="fw-bold mb-0">87</h2>
            <small class="text-white-50">9 bình luận mới chưa duyệt</small>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-3">
        <div class="card border-0 shadow-sm bg-warning text-dark h-100">
          <div class="card-body">
            <h6 class="text-muted text-uppercase small">Trạng thái xác thực</h6>
            <h2 class="fw-bold mb-0">Đã đăng nhập</h2>
            <small class="text-muted">isAuthenticated = true</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Bảng danh sách bài viết quản lý -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h5 class="fw-bold mb-0 text-secondary">Bài viết blog gần đây trong hệ thống</h5>
        <router-link :to="{ name: 'BlogList' }" class="btn btn-sm btn-outline-primary">
          Xem toàn bộ bài viết
        </router-link>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Mã ID</th>
                <th>Tiêu đề bài viết</th>
                <th>Tác giả</th>
                <th>Ngày tạo</th>
                <th>Chuyên mục</th>
                <th class="text-end">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="blog in recentBlogs" :key="blog.id">
                <td><span class="badge bg-secondary">#{{ blog.id }}</span></td>
                <td class="fw-semibold">{{ blog.title }}</td>
                <td>{{ blog.author }}</td>
                <td>{{ blog.date }}</td>
                <td><span class="badge bg-light text-dark border">{{ blog.category }}</span></td>
                <td class="text-end">
                  <button class="btn btn-sm btn-primary" @click="viewPost(blog.id)">
                    Xem chi tiết ($router.push)
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authState, logout } from '../utils/auth';
import { blogs } from '../data/blogs';

export default {
  name: 'Dashboard',
  data() {
    return {
      auth: authState,
      recentBlogs: blogs
    };
  },
  methods: {
    handleLogout() {
      // Đăng xuất và điều hướng về trang Login theo yêu cầu 3c & 3d
      logout();
      alert('Đã đăng xuất thành công!');
      this.$router.push({ name: 'Login' });
    },
    goToProfile() {
      this.$router.push({ name: 'UserProfile' });
    },
    viewPost(id) {
      this.$router.push({ name: 'BlogPost', params: { id: id } });
    }
  }
};
</script>

<style scoped>
.dashboard-view {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
