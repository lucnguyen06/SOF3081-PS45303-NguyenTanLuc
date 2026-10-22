<template>
  <div class="blog-list-view">
    <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
      <div>
        <h2 class="fw-bold text-primary mb-1">Danh sách bài viết Blog</h2>
        <p class="text-muted mb-0">Khám phá các bài viết hữu ích về lập trình Web và Vue.js</p>
      </div>
      <span class="badge bg-primary fs-6">{{ blogList.length }} bài viết</span>
    </div>

    <!-- Công cụ điều hướng động theo ID tùy chỉnh -->
    <div class="card mb-4 bg-light border-0 shadow-sm">
      <div class="card-body">
        <h6 class="fw-bold text-secondary mb-2">Thử nghiệm Route Động (/blog/:id):</h6>
        <div class="row g-2 align-items-center">
          <div class="col-auto">
            <label class="col-form-label">Nhập ID bài viết:</label>
          </div>
          <div class="col-auto">
            <input 
              type="number" 
              v-model.number="customId" 
              class="form-control" 
              placeholder="VD: 1, 2, 3..." 
              min="1"
            />
          </div>
          <div class="col-auto">
            <button class="btn btn-outline-primary" @click="viewPostProgrammatic(customId)">
              Xem bằng $router.push({ name: 'BlogPost', params: { id: {{ customId }} } })
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Danh sách các bài blog dạng Cards -->
    <div class="row g-4">
      <div v-for="blog in blogList" :key="blog.id" class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0 blog-card">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-info text-dark">{{ blog.category }}</span>
              <small class="text-muted">ID: #{{ blog.id }}</small>
            </div>
            <h5 class="card-title fw-bold text-dark">{{ blog.title }}</h5>
            <p class="card-text text-muted flex-grow-1">{{ blog.summary }}</p>
            <div class="border-top pt-2 mt-2 mb-3 text-muted small">
              <div><strong>Tác giả:</strong> {{ blog.author }}</div>
              <div><strong>Ngày đăng:</strong> {{ blog.date }}</div>
            </div>

            <!-- Các lựa chọn điều hướng đến BlogPost -->
            <div class="d-grid gap-2">
              <!-- Điều hướng bằng router-link -->
              <router-link 
                :to="{ name: 'BlogPost', params: { id: blog.id } }" 
                class="btn btn-primary"
              >
                Đọc bài viết (router-link)
              </router-link>

              <!-- Điều hướng bằng phương thức lập trình -->
              <button 
                class="btn btn-outline-secondary btn-sm"
                @click="viewPostProgrammatic(blog.id)"
              >
                Đọc bài viết ($router.push)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { blogs } from '../data/blogs';

export default {
  name: 'BlogList',
  data() {
    return {
      blogList: blogs,
      customId: 1
    };
  },
  methods: {
    // Điều hướng bằng lập trình theo yêu cầu 3d
    viewPostProgrammatic(id) {
      if (!id) {
        alert('Vui lòng nhập ID hợp lệ!');
        return;
      }
      this.$router.push({
        name: 'BlogPost',
        params: { id: id }
      });
    }
  }
};
</script>

<style scoped>
.blog-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
</style>
