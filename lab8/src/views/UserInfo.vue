<template>
  <div class="user-info-tab">
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-primary text-white fw-bold d-flex justify-content-between align-items-center">
        <span>Thông tin cá nhân cơ bản (/profile/info)</span>
        <span class="badge bg-light text-primary">Nested Route 1</span>
      </div>
      <div class="card-body p-4">
        <div class="row align-items-center mb-4">
          <div class="col-auto">
            <img 
              :src="user.avatar" 
              alt="Avatar" 
              class="rounded-circle border border-3 border-primary shadow-sm"
              width="90"
              height="90"
              style="object-fit: cover;"
            />
          </div>
          <div class="col">
            <h4 class="fw-bold mb-1">{{ user.name }}</h4>
            <p class="text-muted mb-1">{{ user.role }} | MSSV: {{ user.studentId }}</p>
            <span class="badge bg-success">Tài khoản chính thức</span>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-md-6">
            <div class="p-3 bg-light rounded border">
              <small class="text-muted d-block">Tên đăng nhập (Username):</small>
              <strong>@{{ user.username }}</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="p-3 bg-light rounded border">
              <small class="text-muted d-block">Địa chỉ Email:</small>
              <strong>{{ user.email }}</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="p-3 bg-light rounded border">
              <small class="text-muted d-block">Số điện thoại:</small>
              <strong>{{ user.phone }}</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="p-3 bg-light rounded border">
              <small class="text-muted d-block">Ngày tham gia hệ thống:</small>
              <strong>{{ user.joinedDate }}</strong>
            </div>
          </div>
          <div class="col-12">
            <div class="p-3 bg-light rounded border">
              <small class="text-muted d-block">Giới thiệu (Bio):</small>
              <span>{{ user.bio }}</span>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-3 border-top d-flex justify-content-end">
          <button class="btn btn-outline-primary" @click="goToSettings">
            Chuyển sang Cài đặt (this.$router.push({ name: 'UserSettings' })) &rarr;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authState } from '../utils/auth';

export default {
  name: 'UserInfo',
  data() {
    return {
      auth: authState
    };
  },
  computed: {
    user() {
      return this.auth.user;
    }
  },
  methods: {
    goToSettings() {
      this.$router.push({ name: 'UserSettings' });
    }
  }
};
</script>

<style scoped>
.user-info-tab {
  animation: fadeIn 0.25s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
