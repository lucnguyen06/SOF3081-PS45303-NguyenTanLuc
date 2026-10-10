<template>
  <div class="container mt-4">
    <div class="card shadow-sm p-4 text-center mx-auto" style="max-width: 500px;">
      <!-- Hiển thị lời chào -->
      <h1 class="text-primary mb-4">{{ greeting }}</h1>
      <!-- Tạo nút thay đổi nội dung -->
      <div>
        <button 
          class="btn btn-success px-4 py-2" 
          v-bind:title="buttonTitle" 
          @click="changeGreeting"
        >
          Click để thay đổi
        </button>
      </div>
      <small class="text-muted mt-3">
        Gợi ý: Rê chuột lên nút để xem thuộc tính <code>title</code> được gắn qua <code>v-bind</code>.
      </small>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      greeting: 'Xin chào bạn!',
      buttonTitle: 'Nhấn để thay đổi lời chào'
    };
  },
  methods: {
    changeGreeting() {
      this.greeting = 'Hello, World!';
      this.buttonTitle = 'Lời chào mới đã được cập nhật';
    }
  }
};
</script>

<style scoped>
h1 {
  transition: all 0.3s ease;
}
</style>
