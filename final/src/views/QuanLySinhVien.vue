<template>
  <div class="qlsv-container py-3">
    <!-- Tiêu đề Quản lý Sinh viên theo đúng Hình 3 -->
    <h2 class="text-center fw-bold mb-3">Quan ly Sinh vien</h2>

    <!-- Trạng thái kết nối lưu dữ liệu JSON -->
    <div class="d-flex justify-content-center align-items-center gap-2 mb-4">
      <span class="badge bg-light text-dark border">
        📁 Nguồn dữ liệu: <code>src/data/db.json</code>
      </span>
      <span v-if="db.isServerSync" class="badge bg-success-subtle text-success border border-success-subtle">
        ● Tự động lưu vào file JSON (Vite API)
      </span>
      <span v-else class="badge bg-secondary-subtle text-secondary border">
        ● Lưu trữ cục bộ (localStorage)
      </span>
      <button 
        type="button" 
        class="btn btn-sm btn-outline-secondary py-0 px-2"
        style="font-size: 0.8rem;"
        title="Khôi phục 3 sinh viên mẫu theo đề bài"
        @click="handleReset"
      >
        ↺ Khôi phục gốc
      </button>
    </div>

    <div class="row justify-content-center g-4">
      <!-- Cột Trái: Thêm sinh viên -->
      <div class="col-md-5 col-lg-4">
        <div class="card border-0 shadow-sm p-3">
          <h4 class="fw-bold mb-3 text-primary text-center">Them sinh vien</h4>

          <form @submit.prevent="themSinhVien">
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

            <!-- Thông báo thêm thành công -->
            <div v-if="successMessage" class="alert alert-success py-2 px-3 small mb-3">
              {{ successMessage }}
            </div>

            <!-- Nút Thêm sinh viên -->
            <div class="d-grid">
              <button type="submit" class="btn btn-warning fw-semibold text-dark py-2">
                Them sinh vien
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
            >
              <span class="fs-6">
                {{ sv.ten }} - {{ sv.tuoi }} tuoi
              </span>
              <!-- Nút xóa sinh viên tiện ích -->
              <button
                type="button"
                class="btn btn-sm btn-outline-danger border-0"
                title="Xóa sinh viên (Cập nhật vào db.json)"
                @click="xoaSinhVien(index)"
              >
                ✕
              </button>
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
import { dbState, addStudent, deleteStudent, resetToDefault } from '../utils/dbService';

export default {
  name: 'QuanLySinhVien',
  data() {
    return {
      // Dữ liệu form nhập liệu với v-model
      tenSinhVien: '',
      tuoi: '',
      errorMessage: '',
      successMessage: '',
      db: dbState
    };
  },
  methods: {
    // Bài 2: Viết code xử lý thêm sinh viên và lưu vào db.json
    async themSinhVien() {
      this.errorMessage = '';
      this.successMessage = '';

      // Kiểm tra tên không để trống
      if (!this.tenSinhVien.trim()) {
        this.errorMessage = 'Vui lòng nhập tên sinh viên!';
        return;
      }

      // Kiểm tra tuổi hợp lệ
      const ageNum = parseInt(this.tuoi, 10);
      if (!this.tuoi || isNaN(ageNum) || ageNum <= 0) {
        this.errorMessage = 'Vui lòng nhập tuổi là số nguyên dương hợp lệ!';
        return;
      }

      // Thêm sinh viên mới vào cơ sở dữ liệu JSON
      await addStudent({
        ten: this.tenSinhVien.trim(),
        tuoi: ageNum
      });

      this.successMessage = `Đã thêm "${this.tenSinhVien.trim()}" và lưu vào db.json thành công!`;

      // Xóa trắng form sau khi thêm
      this.tenSinhVien = '';
      this.tuoi = '';

      // Tự động tắt thông báo sau 3 giây
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    },

    // Hàm xóa sinh viên và cập nhật lại db.json
    async xoaSinhVien(index) {
      const studentName = this.db.students[index]?.ten;
      await deleteStudent(index);
      this.successMessage = `Đã xóa sinh viên "${studentName}" khỏi db.json.`;
      setTimeout(() => {
        this.successMessage = '';
      }, 2500);
    },

    // Khôi phục danh sách sinh viên ban đầu
    async handleReset() {
      if (confirm('Khôi phục danh sách tài khoản và sinh viên về mặc định ban đầu của đề bài?')) {
        await resetToDefault();
        this.successMessage = 'Đã khôi phục dữ liệu gốc từ đề bài!';
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
