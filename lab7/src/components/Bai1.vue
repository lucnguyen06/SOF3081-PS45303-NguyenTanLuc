<template>
  <div class="card shadow-sm border-0">
    <div class="card-header bg-primary text-white py-3">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="mb-0 fw-bold">
          <i class="bi bi-list-check me-2"></i>Bài 1: Quản lý công việc
        </h5>
        <span class="badge bg-light text-primary fw-semibold px-3 py-2">
          Tổng số: {{ jobs.length }} công việc
        </span>
      </div>
    </div>

    <div class="card-body p-4">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <!-- Form Thêm mới công việc -->
          <form @submit.prevent="addJob" class="mb-4">
            <label class="form-label fw-semibold text-secondary">Tên công việc:</label>
            <div class="input-group">
              <input
                type="text"
                class="form-control form-control-lg"
                v-model="newJob"
                placeholder="Nhập tên công việc..."
                autocomplete="off"
              />
              <button type="submit" class="btn btn-primary px-4 fw-semibold">
                Thêm công việc
              </button>
            </div>
            <div v-if="errorMessage" class="text-danger small mt-2">
              {{ errorMessage }}
            </div>
          </form>

          <!-- Danh sách công việc -->
          <div>
            <h6 class="fw-bold text-dark mb-3">Danh sách công việc:</h6>

            <div v-if="jobs.length === 0" class="alert alert-secondary text-center py-4 my-2">
              <p class="mb-0 text-muted fst-italic">Hiện tại chưa có công việc nào trong danh sách.</p>
            </div>

            <ul v-else class="list-group list-group-flush border rounded-3 shadow-sm">
              <li
                v-for="(job, index) in jobs"
                :key="index"
                class="list-group-item d-flex justify-content-between align-items-center py-3 px-3"
              >
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-circle p-2">
                    {{ index + 1 }}
                  </span>
                  <span class="fw-medium text-dark">{{ job }}</span>
                </div>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm px-3 fw-semibold"
                  @click="removeJob(index)"
                  title="Xóa công việc này"
                >
                  Xóa
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Biến lưu trữ tên công việc mới đang nhập
const newJob = ref('');

// Danh sách các công việc mặc định
const jobs = ref(['Ăn sáng', 'Đi học', 'Chơi bóng rổ']);

// Thông báo lỗi nếu để trống
const errorMessage = ref('');

// Hàm thêm công việc mới
const addJob = () => {
  const trimmed = newJob.value.trim();
  if (!trimmed) {
    errorMessage.value = 'Vui lòng nhập tên công việc trước khi thêm!';
    return;
  }

  // Thêm công việc vào danh sách
  jobs.value.push(trimmed);
  // Reset input và lỗi
  newJob.value = '';
  errorMessage.value = '';
};

// Hàm xóa công việc theo vị trí index
const removeJob = (index) => {
  jobs.value.splice(index, 1);
};
</script>

<style scoped>
.list-group-item {
  transition: background-color 0.2s ease;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>
