<template>
  <div class="create-post-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="page-header">
            <h1 class="page-title">
              <i class="bi bi-pen"></i>
              {{ isEdit ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới' }}
            </h1>
            <p class="page-subtitle">
              {{ isEdit ? 'Cập nhật nội dung bài viết của bạn' : 'Chia sẻ ý tưởng và kiến thức của bạn' }}
            </p>
          </div>

          <div class="post-form-card">
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label for="title" class="form-label">
                  <i class="bi bi-card-heading"></i>
                  Tiêu đề bài viết
                </label>
                <input 
                  v-model="formData.title" 
                  type="text" 
                  class="form-control form-control-lg" 
                  id="title"
                  placeholder="Nhập tiêu đề hấp dẫn..."
                  required
                  :class="{ 'is-invalid': errors.title }"
                >
                <div v-if="errors.title" class="invalid-feedback">
                  {{ errors.title }}
                </div>
              </div>

              <div class="mb-4">
                <label for="image" class="form-label">
                  <i class="bi bi-image"></i>
                  URL hình ảnh (tùy chọn)
                </label>
                <input 
                  v-model="formData.image" 
                  type="url" 
                  class="form-control" 
                  id="image"
                  placeholder="https://example.com/image.jpg"
                  @input="validateImageUrl"
                >
                <div v-if="formData.image && isValidImage" class="image-preview mt-3">
                  <img :src="formData.image" alt="Preview" @error="handleImageError">
                  <button type="button" class="remove-image" @click="removeImage">
                    <i class="bi bi-x"></i>
                  </button>
                </div>
              </div>

              <div class="mb-4">
                <label for="content" class="form-label">
                  <i class="bi bi-journal-text"></i>
                  Nội dung bài viết
                </label>
                <textarea 
                  v-model="formData.content" 
                  class="form-control" 
                  id="content"
                  rows="12"
                  placeholder="Viết nội dung bài viết của bạn..."
                  required
                  :class="{ 'is-invalid': errors.content }"
                ></textarea>
                <div class="content-info">
                  <span class="text-muted">
                    {{ formData.content.length }} ký tự
                  </span>
                </div>
                <div v-if="errors.content" class="invalid-feedback d-block">
                  {{ errors.content }}
                </div>
              </div>

              <div v-if="errorMessage" class="alert alert-danger">
                <i class="bi bi-exclamation-circle"></i>
                {{ errorMessage }}
              </div>

              <div class="form-actions">
                <button 
                  type="button" 
                  class="btn btn-secondary btn-lg"
                  @click="handleCancel"
                >
                  <i class="bi bi-x-circle"></i>
                  Hủy
                </button>
                <button 
                  type="submit" 
                  class="btn btn-primary btn-lg"
                  :disabled="isLoading"
                >
                  <span v-if="isLoading">
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Đang xử lý...
                  </span>
                  <span v-else>
                    <i class="bi bi-check-circle"></i>
                    {{ isEdit ? 'Cập nhật' : 'Đăng bài' }}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { postService } from '../utils/storage'

const router = useRouter()
const route = useRoute()

const formData = ref({
  title: '',
  content: '',
  image: ''
})

const errors = ref({})
const errorMessage = ref('')
const isLoading = ref(false)
const isValidImage = ref(false)

const isEdit = computed(() => !!route.params.id)

const validateImageUrl = () => {
  if (!formData.value.image) {
    isValidImage.value = false
    return
  }
  
  const img = new Image()
  img.onload = () => {
    isValidImage.value = true
  }
  img.onerror = () => {
    isValidImage.value = false
  }
  img.src = formData.value.image
}

const handleImageError = () => {
  isValidImage.value = false
}

const removeImage = () => {
  formData.value.image = ''
  isValidImage.value = false
}

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.title) {
    errors.value.title = 'Vui lòng nhập tiêu đề'
  } else if (formData.value.title.length < 10) {
    errors.value.title = 'Tiêu đề phải có ít nhất 10 ký tự'
  } else if (formData.value.title.length > 200) {
    errors.value.title = 'Tiêu đề không được vượt quá 200 ký tự'
  }
  
  if (!formData.value.content) {
    errors.value.content = 'Vui lòng nhập nội dung'
  } else if (formData.value.content.length < 50) {
    errors.value.content = 'Nội dung phải có ít nhất 50 ký tự'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  errorMessage.value = ''
  
  if (!validateForm()) {
    return
  }
  
  isLoading.value = true
  
  setTimeout(() => {
    let result
    
    if (isEdit.value) {
      result = postService.updatePost(route.params.id, formData.value)
    } else {
      result = postService.createPost(formData.value)
    }
    
    if (result.success) {
      router.push('/')
    } else {
      errorMessage.value = result.message
      isLoading.value = false
    }
  }, 1000)
}

const handleCancel = () => {
  if (confirm('Bạn có chắc muốn hủy? Các thay đổi sẽ không được lưu.')) {
    router.back()
  }
}

onMounted(() => {
  if (isEdit.value) {
    const post = postService.getPostById(route.params.id)
    if (post) {
      formData.value = {
        title: post.title,
        content: post.content,
        image: post.image || ''
      }
      if (formData.value.image) {
        validateImageUrl()
      }
    } else {
      router.push('/')
    }
  }
})
</script>

<style scoped>
.create-post-page {
  min-height: calc(100vh - 76px);
  padding: 3rem 0;
  background: linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%);
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #212529;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.page-title i {
  color: #0D6EFD;
}

.page-subtitle {
  color: #6C757D;
  font-size: 1.1rem;
}

.post-form-card {
  background: #FFFFFF;
  border: 1px solid #DEE2E6;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.form-label {
  color: #212529;
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.form-label i {
  color: #0D6EFD;
}

.form-control,
textarea.form-control {
  padding: 1rem 1.25rem;
  font-size: 1rem;
  border-radius: 12px;
  border: 1px solid #CED4DA;
  background: #FFFFFF;
  color: #212529;
  transition: all 0.3s ease;
}

.form-control-lg {
  font-size: 1.25rem;
  font-weight: 600;
  padding: 1.25rem 1.5rem;
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
  line-height: 1.8;
}

.content-info {
  margin-top: 0.5rem;
  text-align: right;
  font-size: 0.875rem;
}

.image-preview {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #DEE2E6;
  max-width: 100%;
}

.image-preview img {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  display: block;
}

.remove-image {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  background: rgba(220, 53, 69, 0.9);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-image:hover {
  background: #DC3545;
  transform: scale(1.1);
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

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-secondary {
  background: #6C757D;
  border-color: #6C757D;
  color: #FFFFFF;
}

.btn-secondary:hover {
  background: #5C636A;
  border-color: #5C636A;
  transform: translateY(-2px);
}

.btn-primary:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(13, 110, 253, 0.3);
}

.btn-lg:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.is-invalid {
  border-color: #DC3545 !important;
}

.invalid-feedback {
  color: #DC3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .post-form-card {
    padding: 2rem 1.5rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn-lg {
    width: 100%;
    justify-content: center;
  }
}
</style>
