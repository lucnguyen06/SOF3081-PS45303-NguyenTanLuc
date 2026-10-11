<template>
  <div class="card shadow-sm border-0">
    <div class="card-body p-4">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="mb-3">
            <label for="scoreInput" class="form-label fw-bold fs-5">Nhập điểm của bạn:</label>
            <input 
              id="scoreInput"
              type="number" 
              class="form-control form-control-lg text-center fw-bold" 
              placeholder="Nhập điểm từ 0 đến 10..."
              step="0.1" 
              min="0" 
              max="10" 
              v-model.number="score" 
            />
            <div class="form-text text-muted">
              Nhập điểm từ 0 đến 10 (Ví dụ: 9 hoặc 7.5)
            </div>
          </div>

          <!-- Kết quả xếp loại theo v-if / v-else-if / v-else -->
          <div class="mt-4 p-3 rounded text-center border">
            <span class="text-muted d-block mb-1">Kết quả xếp loại:</span>

            <!-- Chưa nhập điểm -->
            <p v-if="score === null || score === '' || isNaN(score)" class="text-secondary fst-italic mb-0">
              Vui lòng nhập điểm của bạn ở trên.
            </p>

            <!-- Điểm không hợp lệ -->
            <p v-else-if="score < 0 || score > 10" class="text-danger fw-bold fs-5 mb-0">
              ⚠️ Điểm không hợp lệ! Vui lòng nhập điểm từ 0 đến 10.
            </p>

            <!-- Yếu: < 5.0 -->
            <div v-else-if="score < 5.0">
              <span class="badge bg-danger fs-5 px-3 py-2">Yếu</span>
              <p class="text-danger small mt-2 mb-0">Cần cố gắng học tập thêm nhé!</p>
            </div>

            <!-- Trung bình: 5.0 <= score < 6.5 -->
            <div v-else-if="score < 6.5">
              <span class="badge bg-warning text-dark fs-5 px-3 py-2">Trung bình</span>
              <p class="text-secondary small mt-2 mb-0">Đã đạt mức cơ bản, hãy rèn luyện thêm!</p>
            </div>

            <!-- Khá: 6.5 <= score < 8.0 -->
            <div v-else-if="score < 8.0">
              <span class="badge bg-info text-dark fs-5 px-3 py-2">Khá</span>
              <p class="text-secondary small mt-2 mb-0">Kết quả khá tốt, tiếp tục phát huy!</p>
            </div>

            <!-- Giỏi: 8.0 <= score < 9.0 -->
            <div v-else-if="score < 9.0">
              <span class="badge bg-primary fs-5 px-3 py-2">Giỏi</span>
              <p class="text-secondary small mt-2 mb-0">Thành tích học tập rất tốt!</p>
            </div>

            <!-- Xuất sắc: >= 9.0 -->
            <div v-else>
              <span class="badge bg-success fs-5 px-3 py-2">Xuất sắc</span>
              <p class="text-success small mt-2 mb-0">🎉 Chúc mừng bạn, kết quả thật tuyệt vời!</p>
            </div>
          </div>

          <!-- Bảng tiêu chuẩn xếp loại tham khảo -->
          <div class="mt-4 border rounded p-3 bg-light">
            <h6 class="fw-bold text-dark mb-2">📋 Bảng quy định xếp loại:</h6>
            <ul class="list-unstyled mb-0 small text-secondary">
              <li>• Điểm &lt; 5.0: <strong class="text-danger">Yếu</strong></li>
              <li>• 5.0 ≤ Điểm &lt; 6.5: <strong class="text-warning">Trung bình</strong></li>
              <li>• 6.5 ≤ Điểm &lt; 8.0: <strong class="text-info">Khá</strong></li>
              <li>• 8.0 ≤ Điểm &lt; 9.0: <strong class="text-primary">Giỏi</strong></li>
              <li>• Điểm ≥ 9.0: <strong class="text-success">Xuất sắc</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Khởi tạo giá trị mặc định là 9 theo ảnh minh họa trong Lab6.pdf
const score = ref(9);
</script>

<style scoped>
.card {
  border-radius: 12px;
}
.badge {
  letter-spacing: 0.5px;
}
</style>
