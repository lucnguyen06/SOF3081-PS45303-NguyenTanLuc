<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { initSampleData } from './utils/storage'

onMounted(() => {
  initSampleData()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #F8F9FA;
  color: #212529;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 76px;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #E9ECEF;
}

::-webkit-scrollbar-thumb {
  background: #0D6EFD;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0B5ED7;
}

/* Bootstrap overrides */
.btn-primary {
  background: #0D6EFD;
  border-color: #0D6EFD;
  color: #fff;
  font-weight: 600;
}

.btn-primary:hover {
  background: #0B5ED7;
  border-color: #0B5ED7;
  color: #fff;
}

.btn-danger {
  background: #DC3545;
  border-color: #DC3545;
}

.btn-danger:hover {
  background: #BB2D3B;
  border-color: #BB2D3B;
}

.form-control,
.form-select {
  background: #fff;
  border-color: #DEE2E6;
  color: #212529;
}

.form-control:focus,
.form-select:focus {
  background: #fff;
  border-color: #0D6EFD;
  color: #212529;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.form-control::placeholder {
  color: #6C757D;
}

.card {
  background: #fff;
  border-color: #DEE2E6;
  color: #212529;
}

.modal-content {
  background: #fff;
  border-color: #DEE2E6;
}

.modal-header {
  border-bottom-color: #DEE2E6;
}

.modal-footer {
  border-top-color: #DEE2E6;
}

.btn-close {
  filter: none;
}
</style>
