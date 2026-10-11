<template>
  <div class="card shadow-sm border-0">
    <div class="card-body p-4">
      <div class="row g-4">
        <!-- Cột Form: Thêm hoặc Cập nhật -->
        <div class="col-lg-4 col-md-5">
          <div class="card border border-light-subtle shadow-sm p-3">
            <h5 class="fw-bold text-primary mb-3">
              {{ isEditing ? '✏️ Cập nhật học sinh' : '➕ Thêm học sinh' }}
            </h5>

            <form @submit.prevent="submitForm">
              <!-- Họ và tên -->
              <div class="mb-3">
                <label for="name" class="form-label fw-semibold">Họ tên:</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="name" 
                  placeholder="Nhập họ và tên..."
                  v-model.trim="student.name" 
                  required 
                />
              </div>

              <!-- Điểm -->
              <div class="mb-3">
                <label for="score" class="form-label fw-semibold">Điểm:</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="score" 
                  placeholder="Nhập điểm từ 0 đến 10..."
                  min="0" 
                  max="10" 
                  step="0.1" 
                  v-model.number="student.score" 
                  required 
                />
              </div>

              <!-- Ngày sinh -->
              <div class="mb-3">
                <label for="dob" class="form-label fw-semibold">Ngày sinh:</label>
                <input 
                  type="date" 
                  class="form-control" 
                  id="dob" 
                  v-model="student.dob" 
                  required 
                />
              </div>

              <!-- Nút Thao tác Form -->
              <div class="d-flex gap-2">
                <button 
                  type="submit" 
                  class="btn flex-grow-1 text-white fw-bold"
                  :class="isEditing ? 'btn-warning' : 'btn-success'"
                >
                  {{ isEditing ? 'Cập nhật' : 'Thêm' }}
                </button>

                <button 
                  v-if="isEditing" 
                  type="button" 
                  class="btn btn-outline-secondary"
                  @click="resetForm"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Cột Danh sách học sinh -->
        <div class="col-lg-8 col-md-7">
          <div class="card border border-light-subtle shadow-sm p-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold text-dark mb-0">📋 Danh sách học sinh</h5>
              <span class="badge bg-primary">Tổng số: {{ students.length }}</span>
            </div>

            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th>STT</th>
                    <th>Họ và tên</th>
                    <th>Điểm</th>
                    <th>Ngày sinh</th>
                    <th class="text-center" style="width: 80px;">Sửa</th>
                    <th class="text-center" style="width: 80px;">Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="students.length === 0">
                    <td colspan="6" class="text-center text-muted py-4">
                      Chưa có học sinh nào trong danh sách. Hãy thêm học sinh mới!
                    </td>
                  </tr>

                  <tr 
                    v-for="(stu, index) in students" 
                    :key="index"
                    :class="{ 'table-warning': isEditing && editingIndex === index }"
                  >
                    <td class="fw-bold text-muted">{{ index + 1 }}</td>
                    <td class="fw-semibold">{{ stu.name }}</td>
                    <td>
                      <span 
                        class="badge" 
                        :class="stu.score >= 8 ? 'bg-success' : stu.score >= 5 ? 'bg-info text-dark' : 'bg-danger'"
                      >
                        {{ stu.score }}
                      </span>
                    </td>
                    <td>{{ stu.dob }}</td>
                    <td class="text-center">
                      <button 
                        class="btn btn-warning btn-sm fw-semibold" 
                        @click="editStudent(index)"
                      >
                        Sửa
                      </button>
                    </td>
                    <td class="text-center">
                      <button 
                        class="btn btn-danger btn-sm fw-semibold" 
                        @click="deleteStudent(index)"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Dữ liệu mẫu ban đầu theo yêu cầu Lab 6
const students = ref([
  { name: 'Nguyễn Chí Hùng', score: 8, dob: '2006-01-01' },
  { name: 'Phạm Thị Lan', score: 9, dob: '2006-05-15' }
]);

// Biến quản lý trạng thái form
const student = ref({
  name: '',
  score: null,
  dob: ''
});

const isEditing = ref(false);
const editingIndex = ref(null);

// Xử lý gửi Form (Thêm hoặc Cập nhật)
function submitForm() {
  if (isEditing.value && editingIndex.value !== null) {
    // Cập nhật thông tin học sinh
    students.value[editingIndex.value] = { ...student.value };
    isEditing.value = false;
    editingIndex.value = null;
  } else {
    // Thêm học sinh mới
    students.value.push({ ...student.value });
  }

  resetForm();
}

// Bắt đầu chỉnh sửa học sinh
function editStudent(index) {
  student.value = { ...students.value[index] };
  isEditing.value = true;
  editingIndex.value = index;
}

// Xóa học sinh
function deleteStudent(index) {
  const confirmed = confirm(`Bạn có chắc chắn muốn xóa học sinh "${students.value[index].name}" không?`);
  if (confirmed) {
    students.value.splice(index, 1);
    // Nếu đang sửa chính học sinh bị xóa thì reset form
    if (isEditing.value && editingIndex.value === index) {
      resetForm();
    }
  }
}

// Đặt lại form về trạng thái ban đầu
function resetForm() {
  student.value = {
    name: '',
    score: null,
    dob: ''
  };
  isEditing.value = false;
  editingIndex.value = null;
}
</script>

<style scoped>
.card {
  border-radius: 12px;
}

.table th {
  font-weight: 600;
}
</style>
