<template>
  <div class="card shadow-sm border-0">
    <div class="card-body p-4">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="mb-3">
            <label for="monthInput" class="form-label fw-bold fs-5">Nhập tháng của bạn:</label>
            <input 
              id="monthInput"
              type="number" 
              class="form-control form-control-lg text-center fw-bold" 
              placeholder="Nhập tháng từ 1 đến 12..."
              v-model.number="month" 
            />
            <div class="form-text text-muted">
              Nhập số nguyên từ 1 đến 12 để tra cứu mùa trong năm.
            </div>
          </div>

          <!-- Nút chọn nhanh tháng -->
          <div class="mb-4 text-center">
            <span class="small text-muted d-block mb-2">Chọn nhanh tháng:</span>
            <div class="btn-group flex-wrap" role="group">
              <button 
                v-for="m in 12" 
                :key="m" 
                type="button" 
                class="btn btn-sm"
                :class="month === m ? 'btn-success text-white fw-bold' : 'btn-outline-secondary'"
                @click="month = m"
              >
                T{{ m }}
              </button>
            </div>
          </div>

          <!-- Kết quả phân loại mùa theo đúng yêu cầu đề bài -->
          <div class="p-4 rounded text-center border bg-light">
            <h5 class="text-muted mb-2">Kết quả xác định:</h5>

            <!-- Kiểm tra hợp lệ: Tháng < 1 hoặc > 12 -->
            <p v-if="month < 1 || month > 12" class="text-danger fw-bold fs-5 mb-0" style="color: red;">
              ⚠️ Vui lòng nhập tháng từ 1 đến 12!
            </p>

            <!-- Tháng 1, 2, 3: Mùa Xuân -->
            <div v-else-if="month >= 1 && month <= 3" class="season-box spring">
              <div class="display-6 mb-2">🌸</div>
              <h4 class="fw-bold text-success mb-1">Mùa Xuân</h4>
              <p class="text-muted small mb-0">Tháng {{ month }} thuộc mùa xuân ấm áp và đâm chồi nảy lộc.</p>
            </div>

            <!-- Tháng 4, 5, 6: Mùa Hè -->
            <div v-else-if="month <= 6" class="season-box summer">
              <div class="display-6 mb-2">☀️</div>
              <h4 class="fw-bold text-danger mb-1">Mùa Hè</h4>
              <p class="text-muted small mb-0">Tháng {{ month }} thuộc mùa hè rực rỡ và tràn đầy năng lượng.</p>
            </div>

            <!-- Tháng 7, 8, 9: Mùa Thu -->
            <div v-else-if="month <= 9" class="season-box autumn">
              <div class="display-6 mb-2">🍂</div>
              <h4 class="fw-bold text-warning mb-1">Mùa Thu</h4>
              <p class="text-muted small mb-0">Tháng {{ month }} thuộc mùa thu dịu mát và lãng mạn.</p>
            </div>

            <!-- Còn lại (Tháng 10, 11, 12): Mùa Đông -->
            <div v-else class="season-box winter">
              <div class="display-6 mb-2">❄️</div>
              <h4 class="fw-bold text-info mb-1">Mùa Đông</h4>
              <p class="text-muted small mb-0">Tháng {{ month }} thuộc mùa đông se lạnh cuối năm.</p>
            </div>
          </div>

          <!-- Bảng ghi chú các mùa -->
          <div class="mt-4 border rounded p-3 bg-white">
            <h6 class="fw-bold text-dark mb-2">🗓️ Phân chia mùa theo tháng:</h6>
            <div class="row row-cols-2 g-2 small">
              <div class="col"><span class="badge bg-success-subtle text-success border border-success me-1">Xuân</span> Tháng 1, 2, 3</div>
              <div class="col"><span class="badge bg-danger-subtle text-danger border border-danger me-1">Hè</span> Tháng 4, 5, 6</div>
              <div class="col"><span class="badge bg-warning-subtle text-warning border border-warning me-1">Thu</span> Tháng 7, 8, 9</div>
              <div class="col"><span class="badge bg-info-subtle text-info border border-info me-1">Đông</span> Tháng 10, 11, 12</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Khởi tạo tháng mặc định là 1 theo gợi ý mẫu
const month = ref(1);
</script>

<style scoped>
.card {
  border-radius: 12px;
}
.season-box {
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}
</style>
