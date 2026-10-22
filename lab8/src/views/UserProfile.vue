<template>
  <div class="user-profile-view">
    <!-- Header thông báo minh họa Alias và Nested Routes -->
    <div class="alert alert-info border-0 shadow-sm d-flex flex-wrap justify-content-between align-items-center mb-4">
      <div>
        <h5 class="alert-heading fw-bold mb-1">Trang hồ sơ cá nhân (UserProfile)</h5>
        <div class="text-secondary small">
          Đang truy cập qua đường dẫn: <code>{{ $route.fullPath }}</code>
          <span v-if="isAlias" class="badge bg-warning text-dark ms-2">Đang sử dụng Alias Route (/me)</span>
          <span v-else class="badge bg-primary ms-2">Đang sử dụng Route chuẩn (/profile)</span>
        </div>
      </div>
      <div class="mt-2 mt-md-0 d-flex gap-2">
        <router-link to="/profile" class="btn btn-sm btn-outline-primary" :class="{ active: !isAlias }">
          Xem qua /profile
        </router-link>
        <router-link to="/me" class="btn btn-sm btn-outline-info" :class="{ active: isAlias }">
          Xem qua Alias /me
        </router-link>
      </div>
    </div>

    <!-- Thanh điều hướng giữa các Nested Routes (Yêu cầu 3a) -->
    <div class="card shadow-sm border-0 mb-4">
      <div class="card-header bg-white border-bottom-0 pb-0 pt-3">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <!-- Điều hướng bằng router-link lồng nhau -->
            <router-link 
              :to="{ name: 'UserInfo' }" 
              class="nav-link fw-semibold"
              active-class="active text-primary"
            >
              Thông tin cá nhân (/profile/info)
            </router-link>
          </li>
          <li class="nav-item">
            <!-- Điều hướng bằng router-link lồng nhau -->
            <router-link 
              :to="{ name: 'UserSettings' }" 
              class="nav-link fw-semibold"
              active-class="active text-primary"
            >
              Cài đặt tài khoản (/profile/settings)
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Khu vực render Nested Route con qua <router-view> -->
      <div class="card-body p-4 bg-light">
        <div class="d-flex justify-content-end mb-3 gap-2">
          <span class="text-muted small align-self-center">Chuyển tab bằng lập trình:</span>
          <button class="btn btn-sm btn-outline-secondary" @click="goToSubRoute('UserInfo')">
            this.$router.push({ name: 'UserInfo' })
          </button>
          <button class="btn btn-sm btn-outline-secondary" @click="goToSubRoute('UserSettings')">
            this.$router.push({ name: 'UserSettings' })
          </button>
        </div>

        <!-- Render Component con tại đây -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  computed: {
    // Kiểm tra xem người dùng đang truy cập thông qua alias /me hay không
    isAlias() {
      return this.$route.path.startsWith('/me');
    }
  },
  methods: {
    // Điều hướng lập trình đến các route con theo yêu cầu 3d
    goToSubRoute(routeName) {
      this.$router.push({ name: routeName });
    }
  }
};
</script>

<style scoped>
.user-profile-view {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
