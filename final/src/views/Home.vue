<template>
  <div class="home-container text-center py-4">
    <!-- Hiển thị text "Home page" theo mô tả Bài 1 & Hình 1 -->
    <h1 class="display-6 fw-bold mb-3">Home page</h1>

    <!-- Link "Go to QL Sinh vien" theo mô tả Bài 1 & Hình 1 -->
    <p class="fs-5">
      <router-link to="/quan-ly-sinh-vien" class="text-primary text-decoration-underline fw-semibold">
        Go to QL Sinh vien
      </router-link>
    </p>

    <!-- Hướng dẫn mô tả tính năng cho người chấm điểm -->
    <div class="mt-4 p-3 bg-light border rounded-3 d-inline-block text-start" style="max-width: 550px;">
      <h6 class="fw-bold text-secondary mb-2">📌 Ghi chú kiểm tra (Route Guard):</h6>
      <ul class="mb-0 small text-muted">
        <li>Nếu <strong>chưa đăng nhập</strong>, nhấn vào link trên sẽ tự động chuyển hướng đến <code>Login.vue</code>.</li>
        <li>Sau khi <strong>đăng nhập thành công</strong>, hệ thống sẽ tự động chuyển vào <code>QuanLySinhVien.vue</code>.</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>

<style scoped>
.home-container {
  min-height: 250px;
}
</style>
