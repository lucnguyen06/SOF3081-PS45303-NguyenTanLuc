<template>
  <div class="user-settings-tab">
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-secondary text-white fw-bold d-flex justify-content-between align-items-center">
        <span>Cài đặt tài khoản & tùy chọn (/profile/settings)</span>
        <span class="badge bg-light text-dark">Nested Route 2</span>
      </div>
      <div class="card-body p-4">
        <form @submit.prevent="saveSettings">
          <h5 class="fw-bold text-dark mb-3">Tùy chọn thông báo & giao diện</h5>
          
          <div class="form-check form-switch mb-3">
            <input 
              class="form-check-input" 
              type="checkbox" 
              role="switch" 
              id="notifySwitch" 
              v-model="user.emailNotifications"
            />
            <label class="form-check-label fw-semibold" for="notifySwitch">
              Nhận thông báo qua Email khi có bài viết blog mới
            </label>
            <div class="text-muted small">Hệ thống sẽ gửi bản tin tóm tắt hàng tuần.</div>
          </div>

          <div class="form-check form-switch mb-3">
            <input 
              class="form-check-input" 
              type="checkbox" 
              role="switch" 
              id="darkModeSwitch" 
              v-model="user.darkMode"
            />
            <label class="form-check-label fw-semibold" for="darkModeSwitch">
              Kích hoạt chế độ ban đêm (Dark Mode)
            </label>
            <div class="text-muted small">Tối ưu trải nghiệm đọc ban đêm cho MyBlog.</div>
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Quyền riêng tư trang cá nhân:</label>
            <select class="form-select" v-model="user.profileVisibility">
              <option value="public">Công khai (Mọi người đều xem được)</option>
              <option value="members">Chỉ thành viên đã đăng nhập</option>
              <option value="private">Riêng tư (Chỉ mình tôi)</option>
            </select>
          </div>

          <hr class="my-4" />

          <h5 class="fw-bold text-dark mb-3">Đổi mật khẩu tài khoản</h5>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label small">Mật khẩu hiện tại:</label>
              <input type="password" class="form-control" placeholder="Nhập mật khẩu hiện tại" />
            </div>
            <div class="col-md-6">
              <label class="form-label small">Mật khẩu mới:</label>
              <input type="password" class="form-control" placeholder="Nhập mật khẩu mới" />
            </div>
          </div>

          <div class="mt-4 d-flex justify-content-between align-items-center">
            <button type="button" class="btn btn-outline-secondary" @click="goToInfo">
              &larr; Về Thông tin cơ bản (this.$router.push)
            </button>
            <button type="submit" class="btn btn-success">
              Lưu thay đổi cài đặt
            </button>
          </div>
        </form>

        <div v-if="saveSuccess" class="alert alert-success mt-3 mb-0">
          Đã lưu thay đổi cài đặt thành công!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authState } from '../utils/auth';

export default {
  name: 'UserSettings',
  data() {
    return {
      auth: authState,
      saveSuccess: false
    };
  },
  computed: {
    user() {
      return this.auth.user;
    }
  },
  methods: {
    saveSettings() {
      this.saveSuccess = true;
      setTimeout(() => {
        this.saveSuccess = false;
      }, 3000);
    },
    goToInfo() {
      this.$router.push({ name: 'UserInfo' });
    }
  }
};
</script>

<style scoped>
.user-settings-tab {
  animation: fadeIn 0.25s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
