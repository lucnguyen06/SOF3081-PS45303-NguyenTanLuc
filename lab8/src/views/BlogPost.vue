<template>
  <div class="blog-post-view">
    <div class="mb-3">
      <button class="btn btn-outline-secondary" @click="goBackToList">
        &larr; Quay lại danh sách Blog (this.$router.push)
      </button>
    </div>

    <!-- Khi tìm thấy bài viết -->
    <div v-if="post" class="card shadow-sm border-0">
      <div class="card-header bg-primary text-white py-3">
        <div class="d-flex justify-content-between align-items-center">
          <span class="badge bg-light text-dark">{{ post.category }}</span>
          <span class="badge bg-warning text-dark">Tham số URL: id = {{ currentId }}</span>
        </div>
        <h2 class="h3 fw-bold mt-2 mb-0">{{ post.title }}</h2>
      </div>

      <div class="card-body p-4">
        <div class="d-flex flex-wrap gap-3 text-muted small border-bottom pb-3 mb-3">
          <div><strong>Tác giả:</strong> {{ post.author }}</div>
          <div><strong>Ngày đăng:</strong> {{ post.date }}</div>
          <div><strong>Mã bài viết:</strong> #{{ post.id }}</div>
        </div>

        <div class="alert alert-light border">
          <strong>Tóm tắt:</strong> {{ post.summary }}
        </div>

        <div class="post-content fs-5 text-secondary" style="white-space: pre-line; line-height: 1.8;">
          {{ post.content }}
        </div>

        <!-- Điều hướng chuyển bài viết kế tiếp bằng lập trình -->
        <hr class="my-4" />
        <div class="d-flex justify-content-between align-items-center">
          <button 
            class="btn btn-outline-primary"
            :disabled="post.id <= 1"
            @click="switchPost(post.id - 1)"
          >
            &laquo; Bài viết trước
          </button>

          <span class="text-muted small">
            Đang xem bài viết <strong>{{ post.id }}</strong> / {{ totalBlogs }}
          </span>

          <button 
            class="btn btn-outline-primary"
            :disabled="post.id >= totalBlogs"
            @click="switchPost(post.id + 1)"
          >
            Bài viết kế tiếp &raquo;
          </button>
        </div>
      </div>
    </div>

    <!-- Khi không tìm thấy bài viết với ID truyền vào -->
    <div v-else class="alert alert-danger shadow-sm text-center py-5">
      <h3 class="fw-bold">Không tìm thấy bài viết!</h3>
      <p class="text-muted">
        Không tồn tại bài viết nào với tham số ID: <code>{{ currentId }}</code>
      </p>
      <button class="btn btn-primary" @click="goBackToList">
        Trở về danh sách Blog
      </button>
    </div>
  </div>
</template>

<script>
import { blogs } from '../data/blogs';

export default {
  name: 'BlogPost',
  props: {
    id: {
      type: [String, Number],
      required: false
    }
  },
  data() {
    return {
      allBlogs: blogs
    };
  },
  computed: {
    // Lấy ID từ props hoặc từ $route.params.id theo yêu cầu route động
    currentId() {
      return this.id || this.$route.params.id;
    },
    post() {
      const numericId = parseInt(this.currentId, 10);
      return this.allBlogs.find(item => item.id === numericId) || null;
    },
    totalBlogs() {
      return this.allBlogs.length;
    }
  },
  methods: {
    goBackToList() {
      // Thực hiện điều hướng lập trình bằng this.$router.push
      this.$router.push({ name: 'BlogList' });
    },
    switchPost(targetId) {
      this.$router.push({
        name: 'BlogPost',
        params: { id: targetId }
      });
    }
  }
};
</script>

<style scoped>
.blog-post-view {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
