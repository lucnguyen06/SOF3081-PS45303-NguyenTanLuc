<script setup>
import { ref } from 'vue';
import Hello from './components/Hello.vue';
import Bai3 from './components/Bai3.vue';
import Bai4 from './components/Bai4.vue';

// Tab hiện tại: 'all' | 'bai2' | 'bai3' | 'bai4'
const currentTab = ref('all');
</script>

<template>
  <div class="app-layout">
    <!-- Navbar Header -->
    <header class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3">
      <div class="container">
        <div class="d-flex align-items-center">
          <span class="badge bg-light text-primary me-2 px-2 py-1 fs-6 fw-bold">FPT Poly</span>
          <h1 class="navbar-brand mb-0 h1 fs-4 fw-bold">SOF3081 - LAB 4: VUEJS & BOOTSTRAP</h1>
        </div>
        <div class="text-white-50 small mt-2 mt-lg-0">
          Sinh viên: <strong class="text-white">Nguyễn Tấn Lực</strong> (PS45303)
        </div>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <nav class="bg-white border-bottom shadow-sm sticky-top py-2">
      <div class="container">
        <ul class="nav nav-pills justify-content-center justify-content-md-start gap-2">
          <li class="nav-item">
            <button 
              class="nav-link" 
              :class="{ active: currentTab === 'all' }" 
              @click="currentTab = 'all'"
            >
              📑 Xem Tất Cả Các Bài
            </button>
          </li>
          <li class="nav-item">
            <button 
              class="nav-link" 
              :class="{ active: currentTab === 'bai2' }" 
              @click="currentTab = 'bai2'"
            >
              Bài 2: Hello.vue
            </button>
          </li>
          <li class="nav-item">
            <button 
              class="nav-link" 
              :class="{ active: currentTab === 'bai3' }" 
              @click="currentTab = 'bai3'"
            >
              Bài 3: Bai3.vue (Lời chào)
            </button>
          </li>
          <li class="nav-item">
            <button 
              class="nav-link" 
              :class="{ active: currentTab === 'bai4' }" 
              @click="currentTab = 'bai4'"
            >
              Bài 4: Bai4.vue (Tin tức Dinh dưỡng)
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main Content Area -->
    <main class="container py-4">
      <!-- HIỂN THỊ TẤT CẢ HOẶC TỪNG BÀI -->

      <!-- BÀI 2 -->
      <section v-if="currentTab === 'all' || currentTab === 'bai2'" class="mb-5">
        <div class="card border-0 shadow-sm overflow-hidden">
          <div class="card-header bg-danger text-white py-2 px-3 fw-bold d-flex justify-content-between align-items-center">
            <span>BÀI 2: VIẾT CHƯƠNG TRÌNH VUEJS ĐẦU TIÊN (Hello.vue)</span>
            <span class="badge bg-light text-danger">2 Điểm</span>
          </div>
          <div class="card-body bg-white p-4">
            <Hello />
          </div>
        </div>
      </section>

      <!-- BÀI 3 -->
      <section v-if="currentTab === 'all' || currentTab === 'bai3'" class="mb-5">
        <div class="card border-0 shadow-sm overflow-hidden">
          <div class="card-header bg-success text-white py-2 px-3 fw-bold d-flex justify-content-between align-items-center">
            <span>BÀI 3: HIỂN THỊ VÀ THAY ĐỔI LỜI CHÀO (Bai3.vue)</span>
            <span class="badge bg-light text-success">3 Điểm</span>
          </div>
          <div class="card-body bg-white p-4">
            <Bai3 />
          </div>
        </div>
      </section>

      <!-- BÀI 4 -->
      <section v-if="currentTab === 'all' || currentTab === 'bai4'" class="mb-5">
        <div class="card border-0 shadow-sm overflow-hidden">
          <div class="card-header bg-info text-white py-2 px-3 fw-bold d-flex justify-content-between align-items-center">
            <span>BÀI 4: HIỂN THỊ DANH SÁCH BÀI VIẾT VỚI BOOTSTRAP (Bai4.vue)</span>
            <span class="badge bg-light text-dark">3 Điểm</span>
          </div>
          <div class="card-body bg-white p-4">
            <Bai4 />
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-top py-3 text-center text-muted small mt-auto">
      <div class="container">
        © 2026 SOF3081 - Xây Dựng Giao Diện Tương Tác Backend | Thực hiện: Nguyễn Tấn Lực (PS45303)
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav-pills .nav-link {
  color: #495057;
  font-weight: 500;
  border-radius: 8px;
  padding: 8px 16px;
  transition: all 0.2s ease;
}

.nav-pills .nav-link:hover {
  background-color: #e9ecef;
}

.nav-pills .nav-link.active {
  background-color: #0d6efd;
  color: #fff;
  box-shadow: 0 4px 10px rgba(13, 110, 253, 0.25);
}

.card {
  border-radius: 12px;
}

.card-header {
  letter-spacing: 0.5px;
}
</style>
