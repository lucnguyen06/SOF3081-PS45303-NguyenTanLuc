<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <i class="bi bi-journal-code"></i>
        <span class="ms-2">Blog Manager</span>
      </router-link>
      
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <i class="bi bi-house-door"></i>
              <span class="ms-1">Trang chủ</span>
            </router-link>
          </li>
          
          <template v-if="isAuthenticated">
            <li class="nav-item">
              <router-link to="/create-post" class="nav-link">
                <i class="bi bi-plus-circle"></i>
                <span class="ms-1">Đăng bài</span>
              </router-link>
            </li>
            
            <li class="nav-item dropdown">
              <a 
                class="nav-link dropdown-toggle d-flex align-items-center" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown"
              >
                <img 
                  :src="currentUser.avatar" 
                  alt="Avatar" 
                  class="avatar-sm me-2"
                >
                <span>{{ currentUser.name }}</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <router-link to="/profile" class="dropdown-item">
                    <i class="bi bi-person"></i>
                    <span class="ms-2">Thông tin cá nhân</span>
                  </router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a @click="handleLogout" class="dropdown-item" href="#">
                    <i class="bi bi-box-arrow-right"></i>
                    <span class="ms-2">Đăng xuất</span>
                  </a>
                </li>
              </ul>
            </li>
          </template>
          
          <template v-else>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">
                <i class="bi bi-box-arrow-in-right"></i>
                <span class="ms-1">Đăng nhập</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="btn btn-primary ms-2">
                Đăng ký
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../utils/storage'

const router = useRouter()
const isScrolled = ref(false)
const currentUser = ref(authService.getCurrentUser())

const isAuthenticated = computed(() => !!currentUser.value)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleLogout = () => {
  authService.logout()
  currentUser.value = null
  router.push('/')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Update user info when navigating
  router.afterEach(() => {
    currentUser.value = authService.getCurrentUser()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #DEE2E6;
  transition: all 0.3s ease;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0D6EFD !important;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

.navbar-brand i {
  font-size: 1.8rem;
}

.nav-link {
  color: #212529 !important;
  font-weight: 500;
  padding: 0.5rem 1rem !important;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.nav-link:hover {
  background: rgba(13, 110, 253, 0.1);
  color: #0D6EFD !important;
}

.nav-link.router-link-active {
  color: #0D6EFD !important;
  background: rgba(13, 110, 253, 0.15);
}

.avatar-sm {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #0D6EFD;
  object-fit: cover;
}

.dropdown-menu {
  background: #fff;
  border-color: #DEE2E6;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  margin-top: 0.5rem;
}

.dropdown-item {
  color: #212529;
  padding: 0.75rem 1.25rem;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background: rgba(13, 110, 253, 0.1);
  color: #0D6EFD;
}

.dropdown-divider {
  border-color: #DEE2E6;
}

.btn-primary {
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.4);
}

@media (max-width: 991px) {
  .navbar-nav {
    margin-top: 1rem;
  }
  
  .nav-item {
    margin-bottom: 0.5rem;
  }
  
  .btn-primary {
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style>
