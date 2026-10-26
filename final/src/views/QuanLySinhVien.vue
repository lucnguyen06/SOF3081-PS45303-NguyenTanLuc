<template>
  <div class="qlsv-container py-3">
    <!-- Tiêu đề Quản lý Sinh viên theo đúng Hình 3 -->
    <h2 class="text-center fw-bold mb-4">Quan ly Sinh vien</h2>

    <div class="row justify-content-center g-4">
      <!-- Cột Trái: Thêm / Sửa sinh viên -->
      <div class="col-md-5 col-lg-4">
        <div class="card border-0 shadow-sm p-3">
          <h4 class="fw-bold mb-3 text-primary text-center">
            {{ editingIndex !== -1 ? 'Sửa sinh viên' : 'Them sinh vien' }}
          </h4>

          <form @submit.prevent="xuLyLuu">
            <!-- Tên sinh viên -->
            <div class="mb-3">
              <label class="form-label fw-semibold">Ten sinh vien</label>
              <input
                type="text"
                class="form-control"
                v-model="tenSinhVien"
                placeholder="Nhap ten sinh vien"
              />
            </div>

            <!-- Tuổi -->
            <div class="mb-3">
              <label class="form-label fw-semibold">Tuoi</label>
              <input
                type="number"
                class="form-control"
                v-model="tuoi"
                placeholder="Nhap tuoi"
                min="1"
                max="120"
              />
            </div>

            <!-- Thông báo lỗi nhập liệu nếu có -->
            <div v-if="errorMessage" class="alert alert-danger py-2 px-3 small mb-3">
              {{ errorMessage }}
            </div>

            <!-- Thông báo thành công -->
            <div v-if="successMessage" class="alert alert-success py-2 px-3 small mb-3">
              {{ successMessage }}
            </div>

            <!-- Nút Thêm / Cập nhật sinh viên -->
            <div v-if="editingIndex === -1" class="d-grid">
              <button type="submit" class="btn btn-warning fw-semibold text-dark py-2">
                Them sinh vien
              </button>
            </div>
            <div v-else class="d-flex gap-2">
              <button type="submit" class="btn btn-primary fw-semibold py-2 flex-grow-1">
                Cập nhật sinh viên
              </button>
              <button type="button" class="btn btn-secondary fw-semibold py-2" @click="huySua">
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Cột Phải: Danh sách sinh viên (Tiêu đề màu đỏ theo đúng Hình 3) -->
      <div class="col-md-6 col-lg-5">
        <div class="card border-0 shadow-sm p-3">
          <h4 class="fw-bold mb-3 text-danger text-center">Danh sach sinh vien</h4>

          <!-- Danh sách sinh viên hiển thị động với v-for từ JSON -->
          <ul class="list-group list-group-flush">
            <li
              v-for="(sv, index) in db.students"
              :key="sv.id || index"
              class="list-group-item d-flex justify-content-between align-items-center py-2 px-2"
              :class="{ 'bg-warning-subtle': editingIndex === index }"
            >
              <span class="fs-6">
                {{ sv.ten }} - {{ sv.tuoi }} tuoi
              </span>
              <!-- Các nút Sửa và Xóa sinh viên -->
              <div class="d-flex gap-1">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-primary py-0 px-2"
                  title="Sửa sinh viên"
                  @click="batDauSua(index)"
                >
                  Sửa
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger py-0 px-2"
                  title="Xóa sinh viên"
                  @click="xoaSinhVien(index)"
                >
                  Xóa
                </button>
              </div>
            </li>
          </ul>

          <div v-if="db.students.length === 0" class="text-center text-muted py-3">
            Hiện chưa có sinh viên nào trong danh sách.
          </div>

          <div class="mt-3 text-end text-muted small">
            Tổng số sinh viên: <strong>{{ db.students.length }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dbState, addStudent, updateStudent, deleteStudent } from '../utils/dbService';

export default {
  name: 'QuanLySinhVien',
  data() {
    return {
      // Dữ liệu form nhập liệu với v-model
      tenSinhVien: '',
      tuoi: '',
      editingIndex: -1,
      errorMessage: '',
      successMessage: '',
      db: dbState
    };
  },
  methods: {
    // Điều phối Thêm mới hoặc Cập nhật sinh viên
    async xuLyLuu() {
      if (this.editingIndex !== -1) {
        await this.capNhatSinhVien();
      } else {
        await this.themSinhVien();
      }
    },

    // Bài 2: Viết code xử lý thêm sinh viên và lưu vào db.json
    async themSinhVien() {
      this.errorMessage = '';
      this.successMessage = '';

      if (!this.tenSinhVien.trim()) {
        this.errorMessage = 'Vui lòng nhập tên sinh viên!';
        return;
      }

      const ageNum = parseInt(this.tuoi, 10);
      if (!this.tuoi || isNaN(ageNum) || ageNum <= 0) {
        this.errorMessage = 'Vui lòng nhập tuổi là số nguyên dương hợp lệ!';
        return;
      }

      await addStudent({
        ten: this.tenSinhVien.trim(),
        tuoi: ageNum
      });

      this.successMessage = `Đã thêm "${this.tenSinhVien.trim()}" thành công!`;
      this.tenSinhVien = '';
      this.tuoi = '';

      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    },

    // Bắt đầu chỉnh sửa sinh viên
    batDauSua(index) {
      this.editingIndex = index;
      const sv = this.db.students[index];
      this.tenSinhVien = sv.ten;
      this.tuoi = sv.tuoi;
      this.errorMessage = '';
      this.successMessage = '';
    },

    // Cập nhật thông tin sinh viên đang sửa
    async capNhatSinhVien() {
      this.errorMessage = '';
      this.successMessage = '';

      if (!this.tenSinhVien.trim()) {
        this.errorMessage = 'Vui lòng nhập tên sinh viên!';
        return;
      }

      const ageNum = parseInt(this.tuoi, 10);
      if (!this.tuoi || isNaN(ageNum) || ageNum <= 0) {
        this.errorMessage = 'Vui lòng nhập tuổi là số nguyên dương hợp lệ!';
        return;
      }

      await updateStudent(this.editingIndex, {
        ten: this.tenSinhVien.trim(),
        tuoi: ageNum
      });

      this.successMessage = `Đã cập nhật sinh viên "${this.tenSinhVien.trim()}" thành công!`;
      this.huySua();

      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    },

    // Hủy thao tác sửa
    huySua() {
      this.editingIndex = -1;
      this.tenSinhVien = '';
      this.tuoi = '';
      this.errorMessage = '';
    },

    // Hàm xóa sinh viên và cập nhật lại db.json
    async xoaSinhVien(index) {
      const studentName = this.db.students[index]?.ten;
      if (confirm(`Bạn có chắc chắn muốn xóa sinh viên "${studentName}"?`)) {
        await deleteStudent(index);
        if (this.editingIndex === index) {
          this.huySua();
        } else if (this.editingIndex > index) {
          this.editingIndex--;
        }
        this.successMessage = `Đã xóa sinh viên "${studentName}".`;
        setTimeout(() => {
          this.successMessage = '';
        }, 2500);
      }
    }
  }
};
</script>

<style scoped>
.qlsv-container {
  min-height: 400px;
}
.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>
