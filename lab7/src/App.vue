<template>
  <div class="app-layout">
    <!-- Navigation Tabs -->
    <nav class="bg-white border-bottom shadow-sm sticky-top py-2">
      <div class="container">
        <ul class="nav nav-pills justify-content-center justify-content-md-start gap-2 flex-wrap">
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
              :class="{ active: currentTab === 'bai1' }"
              @click="currentTab = 'bai1'"
            >
              Bài 1: Quản lý công việc
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: currentTab === 'bai2' }"
              @click="currentTab = 'bai2'"
            >
              Bài 2: Form Đăng nhập
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: currentTab === 'bai3' }"
              @click="currentTab = 'bai3'"
            >
              Bài 3: Form Đăng ký
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: currentTab === 'bai4' }"
              @click="currentTab = 'bai4'"
            >
              Bài 4: Bình luận bài viết
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main Content Area -->
    <main class="container py-4 flex-grow-1">
      <!-- BÀI 1 -->
      <section v-if="currentTab === 'all' || currentTab === 'bai1'" class="mb-4">
        <Bai1 />
      </section>

      <!-- BÀI 2 -->
      <section v-if="currentTab === 'all' || currentTab === 'bai2'" class="mb-4">
        <Bai2 />
      </section>

      <!-- BÀI 3 -->
      <section v-if="currentTab === 'all' || currentTab === 'bai3'" class="mb-4">
        <Bai3 />
      </section>

      <!-- BÀI 4 -->
      <section v-if="currentTab === 'all' || currentTab === 'bai4'" class="mb-4">
        <Bai4 />
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-top py-3 text-center text-muted small mt-auto">
      <div class="container">
        <span>SOF3081 - Lập trình Front-End Frameworks (Vue.js) | PS45303 - Nguyễn Tấn Lực</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Bai1 from './components/Bai1.vue';
import Bai2 from './components/Bai2.vue';
import Bai3 from './components/Bai3.vue';
import Bai4 from './components/Bai4.vue';

// Tab hiện tại: 'all' | 'bai1' | 'bai2' | 'bai3' | 'bai4'
const currentTab = ref('all');
</script>

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
  border: 1px solid transparent;
}

.nav-pills .nav-link:hover {
  background-color: #e9ecef;
}

.nav-pills .nav-link.active {
  background-color: #0d6efd;
  color: #fff;
  box-shadow: 0 4px 10px rgba(13, 110, 253, 0.25);
}
</style>
