<template>
  <div class="p-4 border rounded-3 bg-white shadow-sm">
    <!-- Header và Nút Đăng xuất -->
    <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
      <div>
        <h4 class="fw-bold text-primary mb-0">Bình Luận Bài Viết</h4>
        <small class="text-muted">
          Đang đăng nhập với tên: <span class="badge bg-success-subtle text-success-emphasis fs-6">{{ username }}</span>
        </small>
      </div>
      <button @click="$emit('logout')" class="btn btn-outline-secondary btn-sm" title="Đăng xuất tài khoản">
        Đăng xuất
      </button>
    </div>

    <div class="row g-4">
      <!-- Cột bài viết -->
      <div class="col-md-6">
        <div class="card h-100 shadow-sm border">
          <img
            src="https://picsum.photos/600/350"
            class="card-img-top"
            alt="Hình ảnh bài viết"
            style="max-height: 220px; object-fit: cover;"
          />
          <div class="card-body">
            <span class="badge bg-primary mb-2">Công nghệ Vue.js</span>
            <h5 class="card-title fw-bold text-dark">Tiêu đề bài viết: Khám phá Vue.js 3 và Vite</h5>
            <p class="card-text text-secondary">
              Vue.js là một framework JavaScript tiến bộ dùng để xây dựng giao diện người dùng. Với kiến trúc component linh hoạt cùng Composition API, Vue giúp việc quản lý state và tương tác trở nên đơn giản, hiệu quả.
            </p>
          </div>
        </div>
      </div>

      <!-- Cột form bình luận & danh sách bình luận -->
      <div class="col-md-6 d-flex flex-column">
        <!-- Form nhập bình luận -->
        <form @submit.prevent="submitComment" class="mb-3">
          <label class="form-label fw-semibold">Viết bình luận của bạn:</label>
          <div class="mb-2">
            <textarea
              v-model="commentText"
              class="form-control"
              rows="3"
              placeholder="Nhập nội dung bình luận của bạn tại đây..."
            ></textarea>
          </div>
          <button type="submit" class="btn btn-success fw-semibold">
            Gửi bình luận
          </button>
        </form>

        <!-- Danh sách bình luận -->
        <div v-if="comments.length" class="mt-2 flex-grow-1">
          <h6 class="fw-bold text-dark mb-3">
            Danh sách bình luận ({{ comments.length }}):
          </h6>
          <div class="comments-list pe-1" style="max-height: 260px; overflow-y: auto;">
            <ul class="list-group list-group-flush border rounded-3">
              <li
                v-for="(comment, index) in comments"
                :key="index"
                class="list-group-item py-2 px-3"
              >
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <strong class="text-primary">{{ comment.name }}</strong>
                  <small class="text-muted">{{ comment.time || 'Vừa xong' }}</small>
                </div>
                <p class="mb-0 text-secondary">{{ comment.text }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div v-else class="text-muted fst-italic py-3">
          Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Khai báo prop nhận username từ Bai4.vue
const props = defineProps({
  username: {
    type: String,
    required: true,
    default: 'Khách'
  }
});

// Khai báo emit cho sự kiện logout
defineEmits(['logout']);

const commentText = ref('');

// Danh sách các bình luận có sẵn theo mẫu
const comments = ref([
  {
    name: 'Mai',
    text: 'Chúc mừng bạn! Bài viết giải thích rất dễ hiểu.',
    time: '10 phút trước'
  },
  {
    name: 'Tuấn',
    text: 'Tôi rất thích bài viết này, kiến thức về props và emit rất hữu ích.',
    time: '5 phút trước'
  }
]);

// Hàm gửi bình luận
function submitComment() {
  const trimmed = commentText.value.trim();
  if (trimmed) {
    comments.value.unshift({
      name: props.username,
      text: trimmed,
      time: 'Vừa xong'
    });
    commentText.value = '';
  }
}
</script>

<style scoped>
.comments-list::-webkit-scrollbar {
  width: 6px;
}
.comments-list::-webkit-scrollbar-thumb {
  background-color: #dee2e6;
  border-radius: 4px;
}
</style>
