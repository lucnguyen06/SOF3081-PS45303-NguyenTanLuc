<template>
  <div class="home-view">
    <div class="p-5 mb-4 bg-light rounded-3 shadow-sm border">
      <div class="container-fluid py-3">
        <h1 class="display-5 fw-bold text-primary">Chào mừng bạn đến với MyBlog</h1>
        <p class="col-md-9 fs-5 text-muted">
          Ứng dụng minh họa các tính năng nâng cao của <strong>Vue Router 4</strong> trong môn học 
          <strong>SOF3081 - Xây dựng giao diện tương tác Backend</strong>.
        </p>
        <div class="d-flex flex-wrap gap-2 mt-3">
          <!-- Sử dụng router-link để điều hướng -->
          <router-link :to="{ name: 'BlogList' }" class="btn btn-primary btn-lg">
            Khám phá danh sách Blog
          </router-link>
          <router-link :to="{ name: 'UserProfile' }" class="btn btn-outline-secondary btn-lg">
            Trang cá nhân (/profile)
          </router-link>
          <router-link to="/me" class="btn btn-outline-info btn-lg">
            Alias Route (/me)
          </router-link>
        </div>
      </div>
    </div>

    <!-- Giới thiệu các yêu cầu bài Lab 8 -->
    <div class="row g-4 mb-4">
      <div class="col-md-4">
        <div class="card h-100 shadow-sm border-0 bg-white">
          <div class="card-body">
            <h5 class="card-title text-success fw-bold">1. Routes Lồng nhau (Nested)</h5>
            <p class="card-text text-muted">
              Route <code>/profile</code> chứa 2 route con: <code>/profile/info</code> (thông tin) 
              và <code>/profile/settings</code> (cài đặt), render qua <code>&lt;router-view&gt;</code>.
            </p>
            <button class="btn btn-sm btn-outline-success" @click="goToNestedRoute('UserInfo')">
              Chuyển đến /profile/info (Lập trình)
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card h-100 shadow-sm border-0 bg-white">
          <div class="card-body">
            <h5 class="card-title text-info fw-bold">2. Routes Động (Dynamic)</h5>
            <p class="card-text text-muted">
              Định tuyến động <code>/blog/:id</code> cho phép xem chi tiết từng bài viết dựa trên ID truyền vào tham số URL.
            </p>
            <button class="btn btn-sm btn-outline-info" @click="goToBlogPost(1)">
              Xem Blog #1 bằng $router.push
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card h-100 shadow-sm border-0 bg-white">
          <div class="card-body">
            <h5 class="card-title text-warning fw-bold">3. Route Guard & Xác thực</h5>
            <p class="card-text text-muted">
              Route <code>/dashboard</code> được bảo vệ bằng Navigation Guard (requiresAuth). 
              Chưa đăng nhập sẽ tự động chuyển hướng về <code>/login</code>.
            </p>
            <button class="btn btn-sm btn-outline-warning" @click="goToDashboard">
              Thử vào Dashboard (Cần đăng nhập)
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Demo Điều hướng lập trình (Programmatic Navigation) -->
    <div class="card shadow-sm border mb-4">
      <div class="card-header bg-dark text-white fw-bold">
        Thực hành Điều hướng Lập trình (Programmatic Navigation: this.$router.push)
      </div>
      <div class="card-body">
        <p class="text-muted mb-3">
          Dưới đây là các nút kích hoạt phương thức JavaScript gọi 
          <code>this.$router.push({ name: 'routeName' })</code> theo đúng yêu cầu Yêu cầu 3d:
        </p>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-primary" @click="navigateTo('BlogList')">
            this.$router.push({ name: 'BlogList' })
          </button>
          <button class="btn btn-success" @click="navigateTo('UserProfile')">
            this.$router.push({ name: 'UserProfile' })
          </button>
          <button class="btn btn-info text-white" @click="goToBlogPost(2)">
            this.$router.push({ name: 'BlogPost', params: { id: 2 } })
          </button>
          <button class="btn btn-warning" @click="navigateTo('Dashboard')">
            this.$router.push({ name: 'Dashboard' })
          </button>
          <button class="btn btn-secondary" @click="navigateTo('Login')">
            this.$router.push({ name: 'Login' })
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    navigateTo(routeName) {
      // Thực hiện điều hướng lập trình theo yêu cầu 3d
      this.$router.push({ name: routeName });
    },
    goToBlogPost(id) {
      this.$router.push({ name: 'BlogPost', params: { id: id } });
    },
    goToNestedRoute(subRouteName) {
      this.$router.push({ name: subRouteName });
    },
    goToDashboard() {
      this.$router.push({ name: 'Dashboard' });
    }
  }
};
</script>

<style scoped>
.home-view {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
