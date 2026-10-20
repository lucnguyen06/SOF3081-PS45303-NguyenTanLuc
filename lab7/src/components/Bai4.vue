<template>
  <div class="card shadow-sm border-0">
    <div class="card-header bg-primary text-white py-3">
      <h5 class="mb-0 fw-bold">
        <i class="bi bi-chat-dots me-2"></i>Bài 4: Ứng dụng bình luận bài viết (Props & Emit)
      </h5>
    </div>

    <div class="card-body p-4">
      <div class="row justify-content-center">
        <!-- Khi chưa đăng nhập: Hiển thị LoginComponent -->
        <div v-if="!isLoggedIn" class="col-md-6 col-lg-5">
          <LoginComponent @loggedIn="handleLogin" />
        </div>

        <!-- Khi đã đăng nhập: Hiển thị CommentComponent -->
        <div v-else class="col-12 col-xl-10">
          <CommentComponent :username="loggedInUser" @logout="handleLogout" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginComponent from './LoginComponent.vue';
import CommentComponent from './CommentComponent.vue';

// Trạng thái đăng nhập của ứng dụng bình luận
const isLoggedIn = ref(false);
const loggedInUser = ref('');

// Nhận sự kiện đăng nhập kèm tên người dùng từ LoginComponent
function handleLogin(username) {
  loggedInUser.value = username;
  isLoggedIn.value = true;
}

// Xử lý khi người dùng nhấn Đăng xuất trong CommentComponent
function handleLogout() {
  isLoggedIn.value = false;
  loggedInUser.value = '';
}
</script>
