<template>
  <div class="post-detail-page">
    <div class="container">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Đang tải...</span>
        </div>
      </div>

      <!-- Post Not Found -->
      <div v-else-if="!post" class="not-found">
        <i class="bi bi-exclamation-triangle"></i>
        <h2>Không tìm thấy bài viết</h2>
        <p>Bài viết này có thể đã bị xóa hoặc không tồn tại.</p>
        <router-link to="/" class="btn btn-primary">
          <i class="bi bi-house-door"></i>
          Về trang chủ
        </router-link>
      </div>

      <!-- Post Content -->
      <div v-else class="row">
        <div class="col-lg-8 mx-auto">
          <!-- Post Header -->
          <article class="post-article">
            <div class="post-header">
              <h1 class="post-title">{{ post.title }}</h1>
              
              <div class="post-meta-bar">
                <div class="author-section">
                  <img :src="post.authorAvatar" :alt="post.authorName" class="author-avatar">
                  <div class="author-details">
                    <div class="author-name">{{ post.authorName }}</div>
                    <div class="post-date">
                      <i class="bi bi-clock"></i>
                      {{ formatDate(post.createdAt) }}
                      <span v-if="post.updatedAt" class="text-muted ms-2">
                        (Đã chỉnh sửa {{ formatDate(post.updatedAt) }})
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Author Actions -->
                <div v-if="isAuthor" class="post-actions">
                  <button @click="editPost" class="btn btn-sm btn-outline-primary">
                    <i class="bi bi-pencil"></i>
                    Chỉnh sửa
                  </button>
                  <button @click="deletePost" class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-trash"></i>
                    Xóa
                  </button>
                </div>
              </div>
            </div>

            <!-- Post Image -->
            <div v-if="post.image" class="post-image">
              <img :src="post.image" :alt="post.title">
            </div>

            <!-- Post Content -->
            <div class="post-content">
              <p v-for="(paragraph, index) in contentParagraphs" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </article>

          <!-- Comments Section -->
          <section class="comments-section">
            <h3 class="comments-title">
              <i class="bi bi-chat-dots"></i>
              Bình luận ({{ post.comments?.length || 0 }})
            </h3>

            <!-- Comment Form -->
            <div v-if="isAuthenticated" class="comment-form">
              <div class="comment-form-header">
                <img :src="currentUser.avatar" :alt="currentUser.name" class="comment-avatar">
                <textarea 
                  v-model="newComment" 
                  class="form-control" 
                  placeholder="Viết bình luận của bạn..."
                  rows="3"
                  @keydown.ctrl.enter="submitComment"
                ></textarea>
              </div>
              <div class="comment-form-actions">
                <small class="text-muted">Nhấn Ctrl+Enter để gửi</small>
                <button 
                  @click="submitComment" 
                  class="btn btn-primary"
                  :disabled="!newComment.trim() || isSubmitting"
                >
                  <span v-if="isSubmitting">
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Đang gửi...
                  </span>
                  <span v-else>
                    <i class="bi bi-send"></i>
                    Gửi bình luận
                  </span>
                </button>
              </div>
            </div>

            <div v-else class="login-prompt">
              <i class="bi bi-lock"></i>
              <p>Vui lòng <router-link to="/login">đăng nhập</router-link> để bình luận</p>
            </div>

            <!-- Comments List -->
            <div class="comments-list">
              <div v-if="!post.comments || post.comments.length === 0" class="no-comments">
                <i class="bi bi-chat"></i>
                <p>Chưa có bình luận nào. Hãy là người đầu tiên!</p>
              </div>

              <div 
                v-for="comment in post.comments" 
                :key="comment.id" 
                class="comment-item"
              >
                <img :src="comment.authorAvatar" :alt="comment.authorName" class="comment-avatar">
                <div class="comment-body">
                  <div class="comment-header">
                    <span class="comment-author">{{ comment.authorName }}</span>
                    <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
                  </div>
                  <p class="comment-content">{{ comment.content }}</p>
                  
                  <!-- Delete Comment (only for comment author) -->
                  <div v-if="isAuthenticated && currentUser.id === comment.authorId" class="comment-actions">
                    <button 
                      @click="deleteComment(comment.id)" 
                      class="btn-delete-comment"
                    >
                      <i class="bi bi-trash"></i>
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { postService, commentService, authService } from '../utils/storage'

const router = useRouter()
const route = useRoute()

const post = ref(null)
const newComment = ref('')
const isLoading = ref(true)
const isSubmitting = ref(false)
const currentUser = ref(authService.getCurrentUser())

const isAuthenticated = computed(() => !!currentUser.value)
const isAuthor = computed(() => {
  return isAuthenticated.value && post.value && currentUser.value.id === post.value.authorId
})

const contentParagraphs = computed(() => {
  if (!post.value) return []
  return post.value.content.split('\n').filter(p => p.trim())
})

const loadPost = () => {
  isLoading.value = true
  setTimeout(() => {
    post.value = postService.getPostById(route.params.id)
    isLoading.value = false
  }, 500)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 60) return `${minutes} phút trước`
  if (hours < 24) return `${hours} giờ trước`
  if (days < 7) return `${days} ngày trước`
  
  return date.toLocaleDateString('vi-VN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const submitComment = () => {
  if (!newComment.value.trim() || isSubmitting.value) return
  
  isSubmitting.value = true
  
  setTimeout(() => {
    const result = commentService.addComment(route.params.id, {
      content: newComment.value.trim()
    })
    
    if (result.success) {
      // Reload post to get updated comments
      post.value = postService.getPostById(route.params.id)
      newComment.value = ''
    }
    
    isSubmitting.value = false
  }, 500)
}

const deleteComment = (commentId) => {
  if (!confirm('Bạn có chắc muốn xóa bình luận này?')) return
  
  const result = commentService.deleteComment(route.params.id, commentId)
  if (result.success) {
    post.value = postService.getPostById(route.params.id)
  }
}

const editPost = () => {
  router.push(`/edit-post/${post.value.id}`)
}

const deletePost = () => {
  if (!confirm('Bạn có chắc muốn xóa bài viết này? Hành động này không thể hoàn tác.')) return
  
  const result = postService.deletePost(post.value.id)
  if (result.success) {
    router.push('/')
  }
}

onMounted(() => {
  loadPost()
})
</script>

<style scoped>
.post-detail-page {
  min-height: calc(100vh - 76px);
  padding: 3rem 0;
  background: #F8F9FA;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.not-found i {
  font-size: 5rem;
  color: #DC3545;
  margin-bottom: 1.5rem;
}

.not-found h2 {
  color: #212529;
  font-weight: 700;
  margin-bottom: 1rem;
}

.not-found p {
  color: #6C757D;
  margin-bottom: 2rem;
}

/* Post Article */
.post-article {
  background: #FFFFFF;
  border: 1px solid #DEE2E6;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.post-header {
  padding: 3rem 3rem 2rem;
}

.post-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #212529;
  line-height: 1.3;
  margin-bottom: 2rem;
}

.post-meta-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.author-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 3px solid #0D6EFD;
  object-fit: cover;
}

.author-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #212529;
}

.post-date {
  color: #6C757D;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.post-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-outline-primary {
  border-color: #0D6EFD;
  color: #0D6EFD;
}

.btn-outline-primary:hover {
  background: #0D6EFD;
  color: #FFFFFF;
}

.btn-outline-danger {
  border-color: #DC3545;
  color: #DC3545;
}

.btn-outline-danger:hover {
  background: #DC3545;
  color: #fff;
}

.post-image {
  width: 100%;
  max-height: 500px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-content {
  padding: 3rem;
}

.post-content p {
  font-size: 1.1rem;
  line-height: 1.9;
  color: #495057;
  margin-bottom: 1.5rem;
}

/* Comments Section */
.comments-section {
  background: #FFFFFF;
  border: 1px solid #DEE2E6;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.comments-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.comments-title i {
  color: #0D6EFD;
}

.comment-form {
  margin-bottom: 3rem;
}

.comment-form-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.comment-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #0D6EFD;
  object-fit: cover;
  flex-shrink: 0;
}

.comment-form textarea {
  background: #FFFFFF;
  border: 1px solid #CED4DA;
  color: #212529;
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;
}

.comment-form textarea:focus {
  background: #FFFFFF;
  border-color: #0D6EFD;
  box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1);
  color: #212529;
}

.comment-form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 64px;
}

.login-prompt {
  text-align: center;
  padding: 2rem;
  background: #D1E7FD;
  border: 1px dashed #0D6EFD;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.login-prompt i {
  font-size: 2rem;
  color: #0D6EFD;
  margin-bottom: 0.5rem;
}

.login-prompt p {
  color: #495057;
  margin: 0;
}

.login-prompt a {
  color: #0D6EFD;
  font-weight: 600;
  text-decoration: none;
}

.login-prompt a:hover {
  text-decoration: underline;
}

.no-comments {
  text-align: center;
  padding: 3rem 2rem;
  color: #6C757D;
}

.no-comments i {
  font-size: 3rem;
  color: #0D6EFD;
  margin-bottom: 1rem;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: #F8F9FA;
  border: 1px solid #DEE2E6;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.comment-item:hover {
  border-color: #0D6EFD;
  box-shadow: 0 2px 8px rgba(13, 110, 253, 0.1);
}

.comment-body {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.comment-author {
  font-weight: 700;
  color: #212529;
  font-size: 1rem;
}

.comment-date {
  color: #ADB5BD;
  font-size: 0.85rem;
}

.comment-content {
  color: #495057;
  line-height: 1.7;
  margin: 0;
  word-wrap: break-word;
}

.comment-actions {
  margin-top: 0.75rem;
}

.btn-delete-comment {
  background: none;
  border: none;
  color: #DC3545;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.25rem 0;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.btn-delete-comment:hover {
  color: #BB2D3B;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .post-header {
    padding: 2rem 1.5rem 1.5rem;
  }
  
  .post-title {
    font-size: 1.75rem;
  }
  
  .post-content {
    padding: 2rem 1.5rem;
  }
  
  .comments-section {
    padding: 1.5rem;
  }
  
  .comment-form-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding-left: 0;
  }
  
  .post-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
