<template>
  <div class="profile-page">
    <div class="container">
      <div class="row">
        <!-- Profile Sidebar -->
        <div class="col-lg-4">
          <div class="profile-card">
            <div class="profile-header">
              <div class="avatar-wrapper">
                <img :src="currentUser.avatar" :alt="currentUser.name" class="profile-avatar">
                <button v-if="!isEditingAvatar" @click="isEditingAvatar = true" class="edit-avatar-btn">
                  <i class="bi bi-camera"></i>
                </button>
              </div>
              
              <div v-if="isEditingAvatar" class="avatar-edit-form">
                <input 
                  v-model="avatarUrl" 
                  type="url" 
                  class="form-control form-control-sm" 
                  placeholder="URL ảnh đại diện"
                >
                <div class="avatar-edit-actions">
                  <button @click="saveAvatar" class="btn btn-sm btn-primary">Lưu</button>
                  <button @click="cancelAvatarEdit" class="btn btn-sm btn-secondary">Hủy</button>
                </div>
              </div>

              <h2 class="profile-name">{{ currentUser.name }}</h2>
              <p class="profile-email">
                <i class="bi bi-envelope"></i>
                {{ currentUser.email }}
              </p>
              <p v-if="currentUser.bio" class="profile-bio">{{ currentUser.bio }}</p>
              
              <button @click="showEditModal = true" class="btn btn-primary w-100">
                <i class="bi bi-pencil"></i>
                Chỉnh sửa hồ sơ
              </button>
            </div>

            <div class="profile-stats">
              <div class="stat-item">
                <div class="stat-value">{{ userPosts.length }}</div>
                <div class="stat-label">Bài viết</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ totalComments }}</div>
                <div class="stat-label">Bình luận</div>
              </div>
            </div>
          </div>
        </div>

        <!-- User Posts -->
        <div class="col-lg-8">
          <div class="posts-section">
            <h3 class="section-title">
              <i class="bi bi-journal-text"></i>
              Bài viết của tôi
            </h3>

            <div v-if="userPosts.length === 0" class="empty-state">
              <i class="bi bi-inbox"></i>
              <h4>Chưa có bài viết nào</h4>
              <p>Hãy tạo bài viết đầu tiên của bạn!</p>
              <router-link to="/create-post" class="btn btn-primary">
                <i class="bi bi-plus-circle"></i>
                Tạo bài viết
              </router-link>
            </div>

            <div v-else class="posts-list">
              <div 
                v-for="post in userPosts" 
                :key="post.id" 
                class="post-item"
              >
                <div class="post-item-content" @click="viewPost(post.id)">
                  <div v-if="post.image" class="post-item-image">
                    <img :src="post.image" :alt="post.title">
                  </div>
                  <div class="post-item-body">
                    <h4 class="post-item-title">{{ post.title }}</h4>
                    <p class="post-item-excerpt">{{ getExcerpt(post.content) }}</p>
                    <div class="post-item-meta">
                      <span class="meta-item">
                        <i class="bi bi-clock"></i>
                        {{ formatDate(post.createdAt) }}
                      </span>
                      <span class="meta-item">
                        <i class="bi bi-chat"></i>
                        {{ post.comments?.length || 0 }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="post-item-actions">
                  <button @click="editPost(post.id)" class="btn btn-sm btn-outline-primary">
                    <i class="bi bi-pencil"></i>
                    Sửa
                  </button>
                  <button @click="deletePost(post.id)" class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-trash"></i>
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div 
      v-if="showEditModal" 
      class="modal fade show" 
      style="display: block;"
      @click.self="showEditModal = false"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="bi bi-pencil-square"></i>
              Chỉnh sửa thông tin
            </h5>
            <button type="button" class="btn-close" @click="showEditModal = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveProfile">
              <div class="mb-3">
                <label for="editName" class="form-label">Họ và tên</label>
                <input 
                  v-model="editForm.name" 
                  type="text" 
                  class="form-control" 
                  id="editName"
                  required
                >
              </div>

              <div class="mb-3">
                <label for="editEmail" class="form-label">Email</label>
                <input 
                  v-model="editForm.email" 
                  type="email" 
                  class="form-control" 
                  id="editEmail"
                  required
                >
              </div>

              <div class="mb-3">
                <label for="editBio" class="form-label">Giới thiệu</label>
                <textarea 
                  v-model="editForm.bio" 
                  class="form-control" 
                  id="editBio"
                  rows="3"
                ></textarea>
              </div>

              <div class="mb-3">
                <label for="newPassword" class="form-label">Mật khẩu mới (để trống nếu không đổi)</label>
                <input 
                  v-model="editForm.password" 
                  type="password" 
                  class="form-control" 
                  id="newPassword"
                  placeholder="Tối thiểu 6 ký tự"
                  minlength="6"
                >
              </div>

              <div v-if="errorMessage" class="alert alert-danger">
                <i class="bi bi-exclamation-circle"></i>
                {{ errorMessage }}
              </div>

              <div v-if="successMessage" class="alert alert-success">
                <i class="bi bi-check-circle"></i>
                {{ successMessage }}
              </div>

              <div class="d-flex gap-2 justify-content-end">
                <button type="button" class="btn btn-secondary" @click="showEditModal = false">
                  Hủy
                </button>
                <button type="submit" class="btn btn-primary" :disabled="isSaving">
                  <span v-if="isSaving">
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Đang lưu...
                  </span>
                  <span v-else>
                    <i class="bi bi-check"></i>
                    Lưu thay đổi
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showEditModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService, postService } from '../utils/storage'

const router = useRouter()

const currentUser = ref(authService.getCurrentUser())
const userPosts = ref([])
const showEditModal = ref(false)
const isEditingAvatar = ref(false)
const avatarUrl = ref('')
const isSaving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const editForm = ref({
  name: '',
  email: '',
  bio: '',
  password: ''
})

const totalComments = computed(() => {
  return userPosts.value.reduce((total, post) => {
    return total + (post.comments?.length || 0)
  }, 0)
})

const loadUserPosts = () => {
  if (currentUser.value) {
    userPosts.value = postService.getPostsByUser(currentUser.value.id)
  }
}

const viewPost = (id) => {
  router.push(`/post/${id}`)
}

const editPost = (id) => {
  router.push(`/edit-post/${id}`)
}

const deletePost = (id) => {
  if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return
  
  const result = postService.deletePost(id)
  if (result.success) {
    loadUserPosts()
  }
}

const getExcerpt = (content) => {
  return content.length > 120 ? content.substring(0, 120) + '...' : content
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN')
}

const saveAvatar = () => {
  if (!avatarUrl.value) return
  
  const result = authService.updateUser(currentUser.value.id, {
    avatar: avatarUrl.value
  })
  
  if (result.success) {
    currentUser.value = authService.getCurrentUser()
    isEditingAvatar.value = false
    avatarUrl.value = ''
  }
}

const cancelAvatarEdit = () => {
  isEditingAvatar.value = false
  avatarUrl.value = ''
}

const openEditModal = () => {
  editForm.value = {
    name: currentUser.value.name,
    email: currentUser.value.email,
    bio: currentUser.value.bio || '',
    password: ''
  }
  showEditModal.value = true
  errorMessage.value = ''
  successMessage.value = ''
}

const saveProfile = () => {
  errorMessage.value = ''
  successMessage.value = ''
  isSaving.value = true
  
  setTimeout(() => {
    const updateData = {
      name: editForm.value.name,
      email: editForm.value.email,
      bio: editForm.value.bio
    }
    
    if (editForm.value.password) {
      updateData.password = editForm.value.password
    }
    
    const result = authService.updateUser(currentUser.value.id, updateData)
    
    if (result.success) {
      currentUser.value = authService.getCurrentUser()
      successMessage.value = 'Cập nhật thông tin thành công!'
      
      // Update author info in posts
      userPosts.value.forEach(post => {
        postService.updatePost(post.id, {
          authorName: currentUser.value.name,
          authorAvatar: currentUser.value.avatar
        })
      })
      
      setTimeout(() => {
        showEditModal.value = false
        loadUserPosts()
      }, 1500)
    } else {
      errorMessage.value = result.message
    }
    
    isSaving.value = false
  }, 1000)
}

onMounted(() => {
  if (!currentUser.value) {
    router.push('/login')
  } else {
    loadUserPosts()
    editForm.value = {
      name: currentUser.value.name,
      email: currentUser.value.email,
      bio: currentUser.value.bio || '',
      password: ''
    }
  }
})
</script>

<style scoped>
.profile-page {
  min-height: calc(100vh - 76px);
  padding: 3rem 0;
  background: #F8F9FA;
}

/* Profile Card */
.profile-card {
  background: #FFFFFF;
  border: 1px solid #DEE2E6;
  border-radius: 20px;
  overflow: hidden;
  position: sticky;
  top: 96px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.profile-header {
  padding: 2.5rem;
  text-align: center;
  border-bottom: 1px solid #DEE2E6;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.profile-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid #0D6EFD;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.edit-avatar-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 40px;
  height: 40px;
  background: #0D6EFD;
  border: 3px solid #FFFFFF;
  border-radius: 50%;
  color: #FFFFFF;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.edit-avatar-btn:hover {
  background: #0A58CA;
  transform: scale(1.1);
}

.avatar-edit-form {
  margin-bottom: 1rem;
}

.avatar-edit-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 0.5rem;
}

.profile-name {
  font-size: 1.75rem;
  font-weight: 800;
  color: #212529;
  margin-bottom: 0.5rem;
}

.profile-email {
  color: #6C757D;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.profile-bio {
  color: #495057;
  font-style: italic;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 1.5rem;
  background: #F8F9FA;
}

.stat-item {
  text-align: center;
  padding: 1rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: #0D6EFD;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #6C757D;
  font-size: 0.9rem;
}

/* Posts Section */
.posts-section {
  background: #FFFFFF;
  border: 1px solid #DEE2E6;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-title i {
  color: #0D6EFD;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-state i {
  font-size: 4rem;
  color: #0D6EFD;
  margin-bottom: 1rem;
}

.empty-state h4 {
  color: #212529;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #6C757D;
  margin-bottom: 1.5rem;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-item {
  background: #F8F9FA;
  border: 1px solid #DEE2E6;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.post-item:hover {
  border-color: #0D6EFD;
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.15);
}

.post-item-content {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  cursor: pointer;
}

.post-item-image {
  width: 140px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.post-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-item-body {
  flex: 1;
}

.post-item-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.post-item-excerpt {
  color: #6C757D;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.post-item-meta {
  display: flex;
  gap: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ADB5BD;
  font-size: 0.9rem;
}

.meta-item i {
  color: #0D6EFD;
}

.post-item-actions {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #DEE2E6;
  justify-content: flex-end;
  background: #FFFFFF;
}

/* Modal */
.modal-content {
  background: #FFFFFF;
  border: 1px solid #DEE2E6;
  border-radius: 16px;
}

.modal-header {
  border-bottom: 1px solid #DEE2E6;
  padding: 1.5rem;
}

.modal-title {
  color: #212529;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.modal-body {
  padding: 2rem;
}

.form-label {
  color: #212529;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.alert {
  border-radius: 12px;
  border: none;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

@media (max-width: 991px) {
  .profile-card {
    position: static;
    margin-bottom: 2rem;
  }
  
  .post-item-content {
    flex-direction: column;
  }
  
  .post-item-image {
    width: 100%;
    height: 200px;
  }
}
</style>
