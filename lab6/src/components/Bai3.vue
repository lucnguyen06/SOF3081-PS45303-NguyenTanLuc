<template>
  <div class="card shadow-sm border-0">
    <div class="card-body p-4">
      <div class="container">
        <h2 class="text-center mb-4 fw-bold text-dark">Kiến thức sức khỏe cộng đồng</h2>

        <!-- Danh sách bài viết dùng v-for -->
        <div class="row">
          <div 
            class="col-sm-4 mb-4" 
            v-for="(item, index) in items" 
            :key="index"
          >
            <div class="card h-100 shadow-sm border-0 article-card">
              <img 
                :src="item.image" 
                class="card-img-top article-img" 
                :alt="item.title" 
              />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title fw-bold text-dark">{{ item.title }}</h5>
                <p class="card-text text-secondary flex-grow-1">{{ item.content }}</p>
                <div>
                  <button class="btn btn-info text-white" @click="viewDetail(item)">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chi tiết bài viết khi bấm nút Xem chi tiết -->
        <div v-if="selectedArticle" class="alert alert-info mt-4 alert-dismissible fade show" role="alert">
          <h5 class="fw-bold mb-2">📢 Chi tiết bài viết: {{ selectedArticle.title }}</h5>
          <p class="mb-0">{{ selectedArticle.content }}</p>
          <hr />
          <small class="text-muted">Thông tin được chia sẻ vì sức khỏe cộng đồng.</small>
          <button type="button" class="btn-close" @click="selectedArticle = null" aria-label="Close"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Import hình ảnh từ thư mục assets
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';

// Danh sách dữ liệu bài viết
const items = [
  {
    title: '8 loại rau củ quả giàu canxi',
    content: 'Canxi là khoáng chất cần thiết đối với cơ thể người. Có nhiều cách để bổ sung canxi, trong đó bổ sung qua đường ăn uống là cách tốt nhất. Có 8 loại rau củ giàu canxi...',
    image: img1
  },
  {
    title: 'Các loại gia vị tốt cho sức khỏe',
    content: 'Một số loại gia vị cung cấp nhiều polyphenol chống oxy hóa cao hơn các loại gia vị quen thuộc khác. Với một lượng nhỏ các món ăn đã thêm hương thơm và vị hấp dẫn...',
    image: img2
  },
  {
    title: '9 loại đậu bổ dưỡng nên dùng nhiều',
    content: 'Đậu lăng, đậu nành, đậu phộng, đậu Hà Lan giàu chất xơ, protein cùng nhiều vitamin và khoáng chất giúp giảm lượng đường trong máu, tốt cho tim...',
    image: img3
  }
];

const selectedArticle = ref(null);

function viewDetail(article) {
  selectedArticle.value = article;
}
</script>

<style scoped>
.card {
  border-radius: 12px;
}

.article-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.article-img {
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.btn-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-info:hover {
  background-color: #138496;
  border-color: #117a8b;
}
</style>
