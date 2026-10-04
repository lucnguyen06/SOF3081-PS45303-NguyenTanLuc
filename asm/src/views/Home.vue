<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="hero-title">
              Chia sẻ ý tưởng,
              <span class="text-gradient">kết nối cộng đồng</span>
            </h1>
            <p class="hero-description">
              Nền tảng blog hiện đại cho phép bạn tạo, chia sẻ và quản lý nội dung một cách dễ dàng.
              Tham gia cùng cộng đồng những người yêu thích chia sẻ kiến thức.
            </p>
            <div class="hero-actions">
              <router-link v-if="!isAuthenticated" to="/register" class="btn btn-primary btn-lg">
                <i class="bi bi-rocket-takeoff"></i>
                Bắt đầu ngay
              </router-link>
              <router-link v-else to="/create-post" class="btn btn-primary btn-lg">
                <i class="bi bi-plus-circle"></i>
                Viết bài mới
              </router-link>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image">
              <div class="floating-card card-1">
                <i class="bi bi-file-earmark-text"></i>
                <span>Viết bài</span>
              </div>
              <div class="floating-card card-2">
                <i class="bi bi-chat-dots"></i>
                <span>Bình luận</span>
              </div>
              <div class="floating-card card-3">
                <i class="bi bi-share"></i>
                <span>Chia sẻ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Posts Section -->
    <section class="posts-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Bài viết mới nhất</h2>
          <div class="section-actions">
            <div class="search-box">
              <i class="bi bi-search"></i>
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Tìm kiếm bài viết..."
                class="form-control"
              >
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Đang tải...</span>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredPosts.length === 0" class="empty-state">
          <i class="bi bi-inbox"></i>
          <h3>Chưa có bài viết nào</h3>
          <p>{{ searchQuery ? 'Không tìm thấy kết quả phù hợp' : 'Hãy là người đầu tiên tạo bài viết!' }}</p>
          <router-link v-if="isAuthenticated && !searchQuery" to="/create-post" class="btn btn-primary">
            <i class="bi bi-plus-circle"></i>
            Tạo bài viết đầu tiên
          </router-link>
        </div>

        <!-- Posts Grid -->
        <div v-else class="row g-4">
          <div 
            v-for="post in filteredPosts" 
            :key="post.id" 
            class="col-md-6 col-lg-4"
          >
            <div class="post-card" @click="viewPost(post.id)">
              <div class="post-image" v-if="post.image">
                <img :src="post.image" :alt="post.title">
                <div class="post-overlay"></div>
              </div>
              <div class="post-content">
                <h3 class="post-title">{{ post.title }}</h3>
                <p class="post-excerpt">{{ getExcerpt(post.content) }}</p>
                
                <div class="post-meta">
                  <div class="author-info">
                    <img :src="post.authorAvatar" :alt="post.authorName" class="author-avatar">
                    <div>
                      <div class="author-name">{{ post.authorName }}</div>
                      <div class="post-date">{{ formatDate(post.createdAt) }}</div>
                    </div>
                  </div>
                  <div class="post-stats">
                    <span class="stat-item">
                      <i class="bi bi-chat"></i>
                      {{ post.comments?.length || 0 }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { postService, authService } from '../utils/storage'

const router = useRouter()
const posts = ref([])
const searchQuery = ref('')
const isLoading = ref(true)

const isAuthenticated = computed(() => authService.isAuthenticated())

const filteredPosts = computed(() => {
  if (!searchQuery.value) return posts.value
  
  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(post => 
    post.title.toLowerCase().includes(query) ||
    post.content.toLowerCase().includes(query) ||
    post.authorName.toLowerCase().includes(query)
  )
})

const loadPosts = () => {
  isLoading.value = true
  setTimeout(() => {
    posts.value = postService.getAllPosts()
    isLoading.value = false
  }, 500)
}

const viewPost = (id) => {
  router.push(`/post/${id}`)
}

const getExcerpt = (content) => {
  return content.length > 150 ? content.substring(0, 150) + '...' : content
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
  
  return date.toLocaleDateString('vi-VN')
}

onMounted(() => {
  loadPosts()
})
</script>

<style scoped>
.home-page {
  min-height: calc(100vh - 76px);
}

/* Hero Section */
.hero-section {
  padding: 4rem 0 6rem;
  background: linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(13, 110, 253, 0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #212529;
}

.text-gradient {
  background: linear-gradient(135deg, #0D6EFD 0%, #0B5ED7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.2rem;
  color: #6C757D;
  margin-bottom: 2rem;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-lg:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(56, 189, 248, 0.4);
}

.hero-image {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-card {
  position: absolute;
  background: #fff;
  border: 1px solid #DEE2E6;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: float 3s ease-in-out infinite;
}

.floating-card i {
  font-size: 2rem;
  color: #0D6EFD;
}

.floating-card span {
  font-weight: 600;
  color: #212529;
}

.card-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.card-2 {
  top: 50%;
  right: 15%;
  animation-delay: 1s;
}

.card-3 {
  bottom: 20%;
  left: 25%;
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Posts Section */
.posts-section {
  padding: 4rem 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #212529;
  margin: 0;
}

.search-box {
  position: relative;
  width: 300px;
}

.search-box i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6C757D;
  z-index: 1;
}

.search-box input {
  padding-left: 3rem;
  border-radius: 12px;
  border: 1px solid #DEE2E6;
  transition: all 0.3s ease;
  background: #fff;
  color: #212529;
}

.search-box input:focus {
  box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1);
  border-color: #0D6EFD;
}

/* Post Card */
.post-card {
  background: #fff;
  border: 1px solid #DEE2E6;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  border-color: #0D6EFD;
}

.post-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-card:hover .post-image img {
  transform: scale(1.1);
}

.post-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.8) 100%);
}

.post-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.post-excerpt {
  color: #6C757D;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #DEE2E6;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #0D6EFD;
  object-fit: cover;
}

.author-name {
  font-weight: 600;
  color: #212529;
  font-size: 0.9rem;
}

.post-date {
  color: #6C757D;
  font-size: 0.85rem;
}

.post-stats {
  display: flex;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #6C757D;
  font-size: 0.9rem;
}

.stat-item i {
  color: #0D6EFD;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-state i {
  font-size: 4rem;
  color: #0D6EFD;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: #212529;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #6C757D;
  margin-bottom: 1.5rem;
}

/* Responsive */
@media (max-width: 991px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-image {
    margin-top: 3rem;
    height: 300px;
  }
}

@media (max-width: 767px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .search-box {
    width: 100%;
  }
  
  .floating-card {
    padding: 1rem;
  }
  
  .floating-card i {
    font-size: 1.5rem;
  }
}
</style>
