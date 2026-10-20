<template>
  <div class="card shadow-sm border-0">
    <div class="card-header bg-primary text-white py-3">
      <h5 class="mb-0 fw-bold">
        <i class="bi bi-person-plus me-2"></i>Bài 3: Form Đăng ký người dùng (Form Binding v-model)
      </h5>
    </div>

    <div class="card-body p-4">
      <div class="row g-4">
        <!-- Cột trái: Form Đăng ký -->
        <div class="col-lg-6 col-md-12">
          <div class="p-4 border rounded-3 bg-white shadow-sm h-100">
            <h4 class="fw-bold text-primary mb-3">Form Đăng ký</h4>

            <form @submit.prevent="register">
              <!-- Họ tên -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Họ tên:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="name"
                  placeholder="Nhập họ tên"
                  required
                />
              </div>

              <!-- Email -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Email:</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="email"
                  placeholder="Nhập email"
                  required
                />
              </div>

              <!-- Mật khẩu -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Mật khẩu:</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <div class="form-text text-muted">
                  Mật khẩu sẽ được bảo mật và không hiển thị ở kết quả.
                </div>
              </div>

              <!-- Ngày sinh -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Ngày sinh:</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="dateOfBirth"
                  required
                />
              </div>

              <!-- Giới tính (Radio) -->
              <div class="mb-3">
                <label class="form-label fw-semibold d-block">Giới tính:</label>
                <div class="d-flex align-items-center gap-3">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="male"
                      value="Nam"
                      v-model="gender"
                    />
                    <label class="form-check-label" for="male">Nam</label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="female"
                      value="Nữ"
                      v-model="gender"
                    />
                    <label class="form-check-label" for="female">Nữ</label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="other"
                      value="Khác"
                      v-model="gender"
                    />
                    <label class="form-check-label" for="other">Khác</label>
                  </div>
                </div>
              </div>

              <!-- Ngôn ngữ (Checkbox) -->
              <div class="mb-4">
                <label class="form-label fw-semibold d-block">Ngôn ngữ:</label>
                <div class="d-flex flex-wrap align-items-center gap-3">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="vn"
                      value="Tiếng Việt"
                      v-model="languages"
                    />
                    <label class="form-check-label" for="vn">Tiếng Việt</label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="en"
                      value="Tiếng Anh"
                      v-model="languages"
                    />
                    <label class="form-check-label" for="en">Tiếng Anh</label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="jp"
                      value="Tiếng Nhật"
                      v-model="languages"
                    />
                    <label class="form-check-label" for="jp">Tiếng Nhật</label>
                  </div>
                </div>
              </div>

              <!-- Nút Đăng ký -->
              <button type="submit" class="btn btn-primary px-4 py-2 fw-semibold">
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        <!-- Cột phải: Hiển thị thông tin đã đăng ký -->
        <div class="col-lg-6 col-md-12">
          <div class="p-4 border rounded-3 bg-white shadow-sm h-100">
            <h4 class="fw-bold text-success mb-3">Thông tin đã đăng ký</h4>

            <div v-if="isRegistered" class="registered-details">
              <div class="alert alert-success d-flex align-items-center mb-3 py-2">
                <i class="bi bi-check-circle-fill me-2 fs-5"></i>
                <div>Đăng ký thành công! Dưới đây là thông tin chi tiết:</div>
              </div>

              <ul class="list-group list-group-flush border rounded-3">
                <li class="list-group-item d-flex justify-content-between align-items-center py-3">
                  <span class="fw-semibold text-muted">Họ tên:</span>
                  <span class="fw-bold text-dark">{{ registeredData.name }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-3">
                  <span class="fw-semibold text-muted">Email:</span>
                  <span class="fw-bold text-dark">{{ registeredData.email }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-3">
                  <span class="fw-semibold text-muted">Ngày sinh:</span>
                  <span class="fw-bold text-dark">{{ registeredData.dateOfBirth }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-3">
                  <span class="fw-semibold text-muted">Giới tính:</span>
                  <span class="badge bg-info-subtle text-info-emphasis px-3 py-2 fs-6">
                    {{ registeredData.gender }}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center py-3">
                  <span class="fw-semibold text-muted">Ngôn ngữ:</span>
                  <span class="fw-bold text-dark">
                    {{ registeredData.languages.length ? registeredData.languages.join(', ') : 'Chưa chọn ngôn ngữ' }}
                  </span>
                </li>
              </ul>
            </div>

            <div v-else class="text-center py-5 text-muted">
              <div class="display-6 text-secondary mb-3">📋</div>
              <p class="fst-italic mb-0">Vui lòng điền form và nhấn "Đăng ký" để xem thông tin kết quả tại đây.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Các trường dữ liệu của form binding
const name = ref('');
const email = ref('');
const password = ref('');
const dateOfBirth = ref('');
const gender = ref('Nam');
const languages = ref(['Tiếng Việt']);

// Trạng thái đã đăng ký
const isRegistered = ref(false);

// Thông tin lưu lại sau khi bấm đăng ký (không lưu mật khẩu)
const registeredData = ref({
  name: '',
  email: '',
  dateOfBirth: '',
  gender: '',
  languages: []
});

// Hàm xử lý khi submit form đăng ký
const register = () => {
  registeredData.value = {
    name: name.value,
    email: email.value,
    dateOfBirth: dateOfBirth.value,
    gender: gender.value,
    languages: [...languages.value]
  };
  isRegistered.value = true;
};
</script>
