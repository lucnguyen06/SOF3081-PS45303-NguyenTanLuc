<template>
  <div class="card shadow-sm border-0">
    <div class="card-body p-4">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="mb-3">
            <label for="userInput" class="form-label fw-bold fs-5">Nhập dữ liệu:</label>
            <input
              id="userInput"
              v-model="userInput"
              class="form-control form-control-lg"
              placeholder="Nhập dữ liệu vào đây"
            />
          </div>
          <div class="p-3 rounded text-center border bg-light">
            <p class="fs-5 mb-0">Giá trị bạn nhập: <strong>{{ userInput }}</strong></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const userInput = ref('FPL');
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>
