<template>
  <div class="card shadow-sm border-0">
    <div class="card-body p-4">
      <div class="p-5 text-center border rounded bg-white">
        <p class="fs-4 fw-semibold mb-4">{{ message }}</p>
        <button class="btn btn-dark" @click="updateMessage">Thay đổi thông điệp</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('Thông điệp ban đầu');
const updateMessage = () => {
  message.value = 'Thông điệp đã được thay đổi!';
};
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>
