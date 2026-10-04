<template>
  <div class="register-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="auth-card">
            <div class="auth-header">
              <h2 class="auth-title">Đăng ký tài khoản</h2>
              <p class="auth-subtitle">Tạo tài khoản để bắt đầu chia sẻ</p>
            </div>

            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label for="name" class="form-label">
                  <i class="bi bi-person"></i>
                  Họ và tên
                </label>
                <input 
                  v-model="formData.name" 
                  type="text" 
                  class="form-control" 
                  id="name"
                  placeholder="Nguyễn Văn A"
                  required
                  :class="{ 'is-invalid': errors.name }"
                >
                <div v-if="errors.name" class="invalid-feedback">
                  {{ errors.name }}
                </div>
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">
                  <i class="bi bi-envelope"></i>
                  Email
                </label>
                <input 
                  v-model="formData.email" 
                  type="email" 
                  class="form-control" 
                  id="email"
                  placeholder="your.email@example.com"
                  required
                  :class="{ 'is-invalid': errors.email }"
                >
                <div v-if="errors.email" class="invalid-feedback">
                  {{ errors.email }}
                </div>
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">
                  <i class="bi bi-lock"></i>
                  Mật khẩu
                </label>
                <div class="password-input">
                  <input 
                    v-model="formData.password" 
                    :type="showPassword ? 'text' : 'password'" 
                    class="form-control" 
                    id="password"
                    placeholder="Tối thiểu 6 ký tự"
                    required
                    :class="{ 'is-invalid': errors.password }"
                  >
                  <button 
                    type="button" 
                    class="password-toggle"
                    @click="showPassword = !showPassword"
                  >
                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                </div>
                <div v-if="errors.password" class="invalid-feedback d-block">
                  {{ errors.password }}
                </div>
              </div>

              <div class="mb-3">
                <label for="confirmPassword" class="form-label">
                  <i class="bi bi-lock-fill"></i>
                  Xác nhận mật khẩu
                </label>
                <div class="password-input">
                  <input 
                    v-model="formData.confirmPassword" 
                    :type="showConfirmPassword ? 'text' : 'password'" 
                    class="form-control" 
                    id="confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                    required
                    :class="{ 'is-invalid': errors.confirmPassword }"
                  >
                  <button 
                    type="button" 
                    class="password-toggle"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                </div>
                <div v-if="errors.confirmPassword" class="invalid-feedback d-block">
                  {{ errors.confirmPassword }}
                </div>
              </div>

              <div class="mb-3">
                <label for="bio" class="form-label">
                  <i class="bi bi-chat-text"></i>
                  Giới thiệu bản thân (tùy chọn)
                </label>
                <textarea 
                  v-model="formData.bio" 
                  class="form-control" 
                  id="bio"
                  rows="3"
                  placeholder="Viết vài dòng giới thiệu về bạn..."
                ></textarea>
              </div>

              <div v-if="errorMessage" class="alert alert-danger">
                <i class="bi bi-exclamation-circle"></i>
                {{ errorMessage }}
              </div>

              <div v-if="successMessage" class="alert alert-success">
                <i class="bi bi-check-circle"></i>
                {{ successMessage }}
              </div>

              <button 
                type="submit" 
                class="btn btn-primary w-100 btn-lg"
                :disabled="isLoading"
              >
                <span v-if="isLoading">
                  <span class="spinner-border spinner-border-sm me-2"></span>
                  Đang xử lý...
                </span>
                <span v-else>
                  <i class="bi bi-person-plus"></i>
                  Đăng ký
                </span>
              </button>
            </form>

            <div class="auth-footer">
              <p>
                Đã có tài khoản? 
                <router-link to="/login" class="auth-link">Đăng nhập ngay</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../utils/storage'

const router = useRouter()

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  bio: ''
})

const errors = ref({})
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.name) {
    errors.value.name = 'Vui lòng nhập họ tên'
  } else if (formData.value.name.length < 3) {
    errors.value.name = 'Họ tên phải có ít nhất 3 ký tự'
  }
  
  if (!formData.value.email) {
    errors.value.email = 'Vui lòng nhập email'
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = 'Email không hợp lệ'
  }
  
  if (!formData.value.password) {
    errors.value.password = 'Vui lòng nhập mật khẩu'
  } else if (formData.value.password.length < 6) {
    errors.value.password = 'Mật khẩu phải có ít nhất 6 ký tự'
  }
  
  if (!formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Vui lòng xác nhận mật khẩu'
  } else if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Mật khẩu xác nhận không khớp'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  if (!validateForm()) {
    return
  }
  
  isLoading.value = true
  
  // Simulate API call
  setTimeout(() => {
    const { confirmPassword, ...userData } = formData.value
    const result = authService.register(userData)
    
    if (result.success) {
      successMessage.value = 'Đăng ký thành công! Đang chuyển hướng...'
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } else {
      errorMessage.value = result.message
      isLoading.value = false
    }
  }, 1000)
}
</script>

<style scoped>
.register-page {
  min-height: calc(100vh - 76px);
  display: flex;
  align-items: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%);
}

.auth-card {
  background: #FFFFFF;
  border: 1px solid #DEE2E6;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.auth-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.auth-title {
  font-size: 2rem;
  font-weight: 800;
  color: #212529;
  margin-bottom: 0.5rem;
}

.auth-subtitle {
  color: #6C757D;
  font-size: 1rem;
}

.form-label {
  color: #212529;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-control,
textarea.form-control {
  padding: 0.875rem 1.25rem;
  font-size: 1rem;
  border-radius: 12px;
  border: 1px solid #CED4DA;
  background: #FFFFFF;
  color: #212529;
  transition: all 0.3s ease;
}

.form-control:focus,
textarea.form-control:focus {
  background: #FFFFFF;
  border-color: #0D6EFD;
  box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1);
  color: #212529;
}

.form-control::placeholder,
textarea.form-control::placeholder {
  color: #ADB5BD;
}

textarea.form-control {
  resize: vertical;
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6C757D;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.password-toggle:hover {
  color: #0D6EFD;
}

.alert {
  border-radius: 12px;
  border: none;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.alert-danger {
  background: #F8D7DA;
  color: #842029;
  border: 1px solid #F5C2C7;
}

.alert-success {
  background: #D1E7DD;
  color: #0F5132;
  border: 1px solid #BADBCC;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-lg:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(13, 110, 253, 0.3);
}

.btn-lg:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #DEE2E6;
  color: #6C757D;
}

.auth-link {
  color: #0D6EFD;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.auth-link:hover {
  color: #0A58CA;
  text-decoration: underline;
}

.is-invalid {
  border-color: #DC3545 !important;
}

.invalid-feedback {
  color: #DC3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

@media (max-width: 576px) {
  .auth-card {
    padding: 2rem 1.5rem;
  }
  
  .auth-title {
    font-size: 1.75rem;
  }
}
</style>
