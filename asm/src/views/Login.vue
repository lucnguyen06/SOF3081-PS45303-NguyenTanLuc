<template>
  <div class="login-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="auth-card">
            <div class="auth-header">
              <h2 class="auth-title">Đăng nhập</h2>
              <p class="auth-subtitle">Chào mừng bạn trở lại!</p>
            </div>

            <form @submit.prevent="handleLogin">
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
                    placeholder="Nhập mật khẩu"
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

              <div v-if="errorMessage" class="alert alert-danger">
                <i class="bi bi-exclamation-circle"></i>
                {{ errorMessage }}
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
                  <i class="bi bi-box-arrow-in-right"></i>
                  Đăng nhập
                </span>
              </button>
            </form>

            <div class="auth-footer">
              <p>
                Chưa có tài khoản? 
                <router-link to="/register" class="auth-link">Đăng ký ngay</router-link>
              </p>
            </div>

            <!-- Demo Account Info -->
            <div class="demo-info">
              <div class="demo-header">
                <i class="bi bi-info-circle"></i>
                Tài khoản demo
              </div>
              <div class="demo-content">
                <p><strong>Email:</strong> user@example.com</p>
                <p><strong>Mật khẩu:</strong> 123456</p>
              </div>
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
  email: '',
  password: ''
})

const errors = ref({})
const errorMessage = ref('')
const isLoading = ref(false)
const showPassword = ref(false)

const validateForm = () => {
  errors.value = {}
  
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
  
  return Object.keys(errors.value).length === 0
}

const handleLogin = async () => {
  errorMessage.value = ''
  
  if (!validateForm()) {
    return
  }
  
  isLoading.value = true
  
  // Simulate API call
  setTimeout(() => {
    const result = authService.login(formData.value.email, formData.value.password)
    
    if (result.success) {
      router.push('/')
    } else {
      errorMessage.value = result.message
    }
    
    isLoading.value = false
  }, 1000)
}
</script>

<style scoped>
.login-page {
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

.form-control {
  padding: 0.875rem 1.25rem;
  font-size: 1rem;
  border-radius: 12px;
  border: 1px solid #CED4DA;
  background: #FFFFFF;
  color: #212529;
  transition: all 0.3s ease;
}

.form-control:focus {
  background: #FFFFFF;
  border-color: #0D6EFD;
  box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1);
  color: #212529;
}

.form-control::placeholder {
  color: #ADB5BD;
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

.demo-info {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #D1E7FD;
  border: 1px solid #9EC5FE;
  border-radius: 12px;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #084298;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.demo-content p {
  margin: 0.5rem 0;
  color: #495057;
  font-size: 0.9rem;
}

.demo-content strong {
  color: #212529;
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
