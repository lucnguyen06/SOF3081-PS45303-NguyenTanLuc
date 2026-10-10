<template>
  <div class="container mt-4 mb-5">
    <h2 class="text-center mb-4 fw-bold text-dark">Kiến thức sức khỏe cộng đồng</h2>
    
    <div class="row g-4">
      <!-- Bài viết 1 -->
      <div class="col-sm-4">
        <div class="card h-100 shadow-sm border-0">
          <img :src="items[0].image" class="card-img-top article-img" alt="Hình ảnh" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold">{{ items[0].title }}</h5>
            <p class="card-text text-secondary flex-grow-1">{{ items[0].content }}</p>
            <div>
              <button class="btn btn-info text-white" @click="viewDetail(items[0])">Xem chi tiết</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bài viết 2 -->
      <div class="col-sm-4">
        <div class="card h-100 shadow-sm border-0">
          <img :src="items[1].image" class="card-img-top article-img" alt="Hình ảnh" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold">{{ items[1].title }}</h5>
            <p class="card-text text-secondary flex-grow-1">{{ items[1].content }}</p>
            <div>
              <button class="btn btn-info text-white" @click="viewDetail(items[1])">Xem chi tiết</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bài viết 3 -->
      <div class="col-sm-4">
        <div class="card h-100 shadow-sm border-0">
          <img :src="items[2].image" class="card-img-top article-img" alt="Hình ảnh" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold">{{ items[2].title }}</h5>
            <p class="card-text text-secondary flex-grow-1">{{ items[2].content }}</p>
            <div>
              <button class="btn btn-info text-white" @click="viewDetail(items[2])">Xem chi tiết</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Thông báo khi nhấn Xem chi tiết -->
    <div v-if="selectedArticle" class="alert alert-info mt-4 alert-dismissible fade show" role="alert">
      <h6 class="fw-bold mb-1">📢 Chi tiết: {{ selectedArticle.title }}</h6>
      <p class="mb-0">{{ selectedArticle.content }}</p>
      <button type="button" class="btn-close" @click="selectedArticle = null" aria-label="Close"></button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Import hình ảnh từ thư mục assets
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';

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
.article-img {
  height: 180px;
  object-fit: cover;
  border-top-left-radius: var(--bs-card-inner-border-radius);
  border-top-right-radius: var(--bs-card-inner-border-radius);
}

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
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
