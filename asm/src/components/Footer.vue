<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-4">
          <h5 class="footer-title">
            <i class="bi bi-journal-code"></i>
            Blog Manager
          </h5>
          <p class="footer-text">
            Nền tảng quản lý blog hiện đại, được xây dựng với Vue.js và Bootstrap.
            Chia sẻ kiến thức và kết nối cộng đồng.
          </p>
        </div>
        
        <div class="col-md-4 mb-4">
          <h6 class="footer-subtitle">Liên kết nhanh</h6>
          <ul class="footer-links">
            <li><router-link to="/">Trang chủ</router-link></li>
            <li><router-link to="/create-post">Đăng bài viết</router-link></li>
            <li><router-link to="/profile">Thông tin cá nhân</router-link></li>
          </ul>
        </div>
        
        <div class="col-md-4 mb-4">
          <h6 class="footer-subtitle">Kết nối</h6>
          <div class="social-links">
            <a href="#" class="social-link">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="#" class="social-link">
              <i class="bi bi-twitter"></i>
            </a>
            <a href="#" class="social-link">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="#" class="social-link">
              <i class="bi bi-github"></i>
            </a>
          </div>
        </div>
      </div>
      
      <hr class="footer-divider">
      
      <div class="footer-bottom">
        <p class="mb-0">
          &copy; {{ currentYear }} Blog Manager. 
          <span class="text-primary">SOF3081 Assignment</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: #F8F9FA;
  border-top: 1px solid #DEE2E6;
  padding: 3rem 0 1.5rem;
  margin-top: 4rem;
}

.footer-title {
  color: #0D6EFD;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-text {
  color: #6C757D;
  font-size: 0.95rem;
  line-height: 1.6;
}

.footer-subtitle {
  color: #212529;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: #6C757D;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
}

.footer-links a:hover {
  color: #0D6EFD;
  padding-left: 0.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #DEE2E6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6C757D;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-link:hover {
  background: #0D6EFD;
  color: #fff;
  border-color: #0D6EFD;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.4);
}

.footer-divider {
  border-color: #DEE2E6;
  margin: 2rem 0 1.5rem;
}

.footer-bottom {
  text-align: center;
  color: #6C757D;
  font-size: 0.9rem;
}

.text-primary {
  color: #0D6EFD !important;
  font-weight: 600;
}
</style>
