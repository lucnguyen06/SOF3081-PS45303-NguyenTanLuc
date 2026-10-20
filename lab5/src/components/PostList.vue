<template>
  <div>
    <h2>Danh sách bài viết</h2>
    <div
      v-for="(post, index) in posts"
      :key="index"
      :class="{ 'highlighted': post.title.length > 20 }"
      :style="{ backgroundColor: post.backgroundColor, color: post.textColor }"
      class="post"
    >
      <h3 class="text-success">{{ post.title }}</h3>
      <h4 class="text-danger">{{ post.author }}</h4>
      <p>{{ post.content }}</p>
      <div class="d-flex flex-wrap gap-3 mt-3">
        <label class="small d-flex align-items-center gap-1">
          Màu nền:
          <input
            type="color"
            :value="post.backgroundColor"
            @input="$emit('update-style', { index, key: 'backgroundColor', value: $event.target.value })"
          />
        </label>
        <label class="small d-flex align-items-center gap-1">
          Màu chữ:
          <input
            type="color"
            :value="post.textColor"
            @input="$emit('update-style', { index, key: 'textColor', value: $event.target.value })"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostList',
  emits: ['update-style'],
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
.post {
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.highlighted {
  border: 2px solid lightgray;
}
</style>
