# BÁO CÁO ĐỒ ÁN
## ỨNG DỤNG QUẢN LÝ TRANG BLOG VỚI VUE.JS VÀ BOOTSTRAP

---

### THÔNG TIN SINH VIÊN
- **Họ và tên**: Nguyễn Tấn Lực
- **Mã số sinh viên**: PS45303
- **Môn học**: SOF3081 - Xây dựng giao diện tương tác Backend
- **Học kỳ**: [Học kỳ hiện tại]

---

## PHẦN 1: TỔNG QUAN ĐỀ TÀI

### 1.1. Giới thiệu
Đồ án xây dựng một ứng dụng web quản lý blog hoàn chỉnh, cho phép người dùng tạo tài khoản, đăng bài viết, bình luận và quản lý thông tin cá nhân. Ứng dụng được phát triển bằng **Vue.js 3** (Composition API) và **Bootstrap 5**, áp dụng các kiến thức về frontend hiện đại.

### 1.2. Mục tiêu
- Xây dựng SPA (Single Page Application) với Vue.js
- Thực hành các khái niệm cơ bản và nâng cao của Vue.js
- Áp dụng Bootstrap để tạo giao diện responsive
- Quản lý state và routing trong ứng dụng
- Xử lý authentication và authorization

### 1.3. Công nghệ sử dụng
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| Vue.js | 3.5.42 | JavaScript Framework |
| Vue Router | 4.2.5 | Client-side routing |
| Bootstrap | 5.3.2 | CSS Framework |
| Bootstrap Icons | 1.11.3 | Icon library |
| Vite | 8.3.0 | Build tool & Dev server |

---

## PHẦN 2: CÁC YÊU CẦU ĐÃ HOÀN THÀNH

### Y1 - YÊU CẦU VỀ TỔ CHỨC DỰ ÁN ✅

#### 1. Khởi tạo dự án VueJS, cài Bootstrap
- ✅ Khởi tạo dự án với Vite
- ✅ Cài đặt Vue.js 3 với Composition API
- ✅ Cài đặt Vue Router 4
- ✅ Tích hợp Bootstrap 5 và Bootstrap Icons
- ✅ Cấu hình router và navigation guards

#### 2. Xây dựng giao diện các trang
- ✅ **Trang chủ (Home)**: Hiển thị danh sách bài viết với tính năng tìm kiếm
- ✅ **Trang đăng nhập (Login)**: Form đăng nhập với validation
- ✅ **Trang đăng ký (Register)**: Form đăng ký tài khoản mới
- ✅ **Trang tạo bài viết (CreatePost)**: Form tạo bài viết với editor
- ✅ **Trang chỉnh sửa (EditPost)**: Form chỉnh sửa bài viết
- ✅ **Trang chi tiết (PostDetail)**: Hiển thị bài viết và bình luận
- ✅ **Trang profile (Profile)**: Quản lý thông tin cá nhân

**Components chung:**
- ✅ Navbar: Navigation responsive với dropdown menu
- ✅ Footer: Footer với thông tin và social links

### Y2 - YÊU CẦU VỀ HOÀN THIỆN CHỨC NĂNG ✅

#### 1. Đăng ký, đăng nhập ✅
**Chức năng đăng ký:**
- Validate form đầy đủ (name, email, password, confirmPassword)
- Kiểm tra email đã tồn tại
- Lưu thông tin user vào LocalStorage
- Tự động đăng nhập sau khi đăng ký thành công

**Chức năng đăng nhập:**
- Validate credentials
- Kiểm tra email và password
- Lưu session vào LocalStorage
- Redirect về trang chủ sau khi đăng nhập

**Authentication Guard:**
- Bảo vệ các route yêu cầu đăng nhập
- Auto redirect về login nếu chưa authenticate

#### 2. Đăng bài viết ✅
- Tạo bài viết mới với tiêu đề, nội dung, hình ảnh
- Chỉnh sửa bài viết của chính mình
- Xóa bài viết với xác nhận
- Validate form (tiêu đề >= 10 ký tự, nội dung >= 50 ký tự)
- Preview hình ảnh khi nhập URL
- Hiển thị số ký tự đã nhập

#### 3. Bình luận bài viết ✅
- Thêm bình luận vào bài viết (yêu cầu đăng nhập)
- Hiển thị danh sách bình luận theo thứ tự mới nhất
- Xóa bình luận của chính mình
- Hiển thị thông tin người bình luận (avatar, tên, thời gian)
- Submit bằng button hoặc Ctrl+Enter

#### 4. Quản lý thông tin cá nhân ✅
- Xem thông tin cá nhân (tên, email, bio, avatar)
- Chỉnh sửa thông tin profile
- Đổi mật khẩu
- Cập nhật ảnh đại diện
- Xem danh sách bài viết của mình
- Thống kê số bài viết và bình luận
- Chỉnh sửa/Xóa bài viết từ trang profile

---

## PHẦN 3: CÁC KIẾN THỨC VUE.JS ĐÃ ÁP DỤNG

### 3.1. Template Syntax
```vue
<!-- Interpolation -->
<h1>{{ post.title }}</h1>

<!-- Attribute binding -->
<img :src="post.image" :alt="post.title">

<!-- Event handling -->
<button @click="handleSubmit">Đăng bài</button>

<!-- Modifiers -->
<form @submit.prevent="handleLogin">
```

### 3.2. Data Binding & Reactivity
```javascript
// Reactive state với ref
const formData = ref({
  title: '',
  content: ''
})

// Computed properties
const isAuthenticated = computed(() => !!currentUser.value)

// Two-way binding
<input v-model="formData.title" />
```

### 3.3. Conditional Rendering
```vue
<!-- v-if / v-else -->
<div v-if="isLoading">Loading...</div>
<div v-else-if="posts.length === 0">No posts</div>
<div v-else>{{ posts.length }} posts</div>

<!-- v-show -->
<div v-show="showEditModal">Modal content</div>
```

### 3.4. List Rendering
```vue
<div v-for="post in filteredPosts" :key="post.id">
  <h3>{{ post.title }}</h3>
</div>
```

### 3.5. Class & Style Binding
```vue
<!-- Dynamic classes -->
<nav :class="{ 'scrolled': isScrolled }">

<!-- Conditional class -->
<input :class="{ 'is-invalid': errors.email }">

<!-- Array syntax -->
<div :class="[baseClass, isActive ? activeClass : '']">
```

### 3.6. Form Binding
```vue
<!-- Text input -->
<input v-model="formData.email" type="email">

<!-- Textarea -->
<textarea v-model="formData.content" rows="10"></textarea>

<!-- Checkbox -->
<input v-model="agreedToTerms" type="checkbox">
```

### 3.7. Event Handling
```javascript
// Method handlers
@click="handleClick"
@submit.prevent="handleSubmit"

// Inline handlers
@click="count++"

// Event modifiers
@keydown.ctrl.enter="submitComment"
@click.self="closeModal"
```

### 3.8. Vue Router
```javascript
// Route configuration
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    meta: { requiresAuth: true } // Protected route
  }
]

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('currentUser')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

// Programmatic navigation
router.push('/post/' + postId)
router.back()
```

### 3.9. Lifecycle Hooks
```javascript
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  loadPosts()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
```

### 3.10. Composition API
```javascript
import { ref, computed, watch } from 'vue'

// Setup function
const count = ref(0)
const doubleCount = computed(() => count.value * 2)

watch(count, (newVal, oldVal) => {
  console.log(`Changed from ${oldVal} to ${newVal}`)
})
```

---

## PHẦN 4: THIẾT KẾ GIAO DIỆN

### 4.1. Design System

**Color Palette:**
- Primary: #38BDF8 (Sky Blue) - Accent màu chính
- Secondary: #22D3EE (Cyan) - Hover states
- Action: #F97316 (Orange) - Delete/Warning actions
- Background: #0F172A (Deep Navy) - Main background
- Surface: #1E293B (Slate) - Card background
- Border: #334155 - Borders và dividers
- Text: #F8FAFC (Off-white) - Primary text
- Text Muted: #94A3B8 - Secondary text

**Typography:**
- Font Family: Inter (Google Fonts)
- Heading: 700-800 weight
- Body: 400-500 weight
- Line Height: 1.6-1.8 cho readability

**Layout:**
- Border Radius: 12px-20px cho cards
- Spacing: Bootstrap spacing scale (0.25rem increments)
- Container: max-width 1200px
- Grid: Bootstrap 12-column grid

### 4.2. Components Style

**Cards:**
- Background: #1E293B
- Border: 1px solid #334155
- Border Radius: 16-20px
- Hover: Transform translateY(-8px) + border color change

**Buttons:**
- Primary: #38BDF8 background, #0F172A text
- Hover: #22D3EE + translateY(-2px)
- Danger: #F97316 background
- Border Radius: 12px

**Forms:**
- Background: #0F172A
- Border: #334155
- Focus: #38BDF8 border + glow effect
- Padding: 1rem

**Navbar:**
- Backdrop blur effect
- Sticky positioning
- Transparent background với scroll effect

### 4.3. Responsive Breakpoints

```css
/* Mobile First Approach */
- Mobile: < 576px
- Tablet: 576px - 991px
- Desktop: >= 992px
```

---

## PHẦN 5: QUẢN LÝ DỮ LIỆU

### 5.1. LocalStorage Structure

**Users Collection:**
```javascript
localStorage.setItem('users', JSON.stringify([
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'user@example.com',
    password: '123456',
    avatar: 'https://...',
    bio: 'Bio text',
    createdAt: '2024-01-01T00:00:00.000Z'
  }
]))
```

**Posts Collection:**
```javascript
localStorage.setItem('posts', JSON.stringify([
  {
    id: '1',
    title: 'Post title',
    content: 'Post content',
    image: 'https://...',
    authorId: '1',
    authorName: 'Nguyễn Văn A',
    authorAvatar: 'https://...',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z',
    comments: [...]
  }
]))
```

**Current User Session:**
```javascript
localStorage.setItem('currentUser', JSON.stringify({
  id: '1',
  name: 'Nguyễn Văn A',
  email: 'user@example.com',
  avatar: 'https://...',
  bio: 'Bio text'
}))
```

### 5.2. Service Layer

**authService:**
- `getCurrentUser()`: Lấy user đang đăng nhập
- `login(email, password)`: Xử lý đăng nhập
- `register(userData)`: Đăng ký tài khoản mới
- `logout()`: Đăng xuất
- `updateUser(userId, userData)`: Cập nhật thông tin
- `isAuthenticated()`: Kiểm tra trạng thái đăng nhập

**postService:**
- `getAllPosts()`: Lấy tất cả bài viết
- `getPostById(id)`: Lấy bài viết theo ID
- `createPost(postData)`: Tạo bài viết mới
- `updatePost(id, postData)`: Cập nhật bài viết
- `deletePost(id)`: Xóa bài viết
- `getPostsByUser(userId)`: Lấy bài viết của user

**commentService:**
- `addComment(postId, commentData)`: Thêm bình luận
- `deleteComment(postId, commentId)`: Xóa bình luận

---

## PHẦN 6: TÍNH NĂNG NỔI BẬT

### 6.1. User Experience

✅ **Real-time Search**: Tìm kiếm bài viết ngay khi nhập, không cần submit
✅ **Keyboard Shortcuts**: Ctrl+Enter để submit form nhanh
✅ **Loading States**: Hiển thị spinner khi đang xử lý
✅ **Empty States**: Giao diện thân thiện khi chưa có dữ liệu
✅ **Confirmation Dialogs**: Xác nhận trước khi xóa
✅ **Form Validation**: Validate real-time với thông báo lỗi rõ ràng
✅ **Image Preview**: Preview ảnh trước khi đăng bài
✅ **Character Counter**: Đếm số ký tự khi nhập nội dung
✅ **Relative Time**: Hiển thị thời gian tương đối (5 phút trước, 2 giờ trước)

### 6.2. Developer Experience

✅ **Component Structure**: Tách biệt rõ ràng views và components
✅ **Reusable Services**: Logic tái sử dụng trong utils/storage.js
✅ **Consistent Styling**: Design system nhất quán
✅ **Clean Code**: Code dễ đọc, dễ maintain
✅ **Composition API**: Sử dụng pattern hiện đại của Vue 3

---

## PHẦN 7: KIỂM THỬ

### 7.1. Test Cases Đã Thực Hiện

**Authentication:**
- ✅ Đăng ký với thông tin hợp lệ
- ✅ Đăng ký với email đã tồn tại
- ✅ Đăng nhập với thông tin đúng
- ✅ Đăng nhập với thông tin sai
- ✅ Access protected route khi chưa đăng nhập
- ✅ Đăng xuất thành công

**Post Management:**
- ✅ Tạo bài viết mới
- ✅ Chỉnh sửa bài viết của mình
- ✅ Xóa bài viết của mình
- ✅ Không thể sửa/xóa bài viết của người khác
- ✅ Tìm kiếm bài viết

**Comments:**
- ✅ Thêm bình luận khi đã đăng nhập
- ✅ Không thể bình luận khi chưa đăng nhập
- ✅ Xóa bình luận của mình

**Profile:**
- ✅ Xem thông tin cá nhân
- ✅ Cập nhật thông tin
- ✅ Đổi mật khẩu
- ✅ Thay đổi avatar

### 7.2. Browser Compatibility

Đã test trên:
- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Edge (Latest)
- ✅ Safari (Latest)

### 7.3. Responsive Testing

Đã test trên:
- ✅ Desktop (1920x1080, 1366x768)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667, 414x896)

---

## PHẦN 8: KẾT LUẬN

### 8.1. Kết quả đạt được

✅ **Hoàn thành 100% yêu cầu đề bài:**
- Y1: Tổ chức dự án và xây dựng giao diện
- Y2: Hoàn thiện đầy đủ các chức năng

✅ **Áp dụng đầy đủ kiến thức Vue.js:**
- Template syntax
- Data binding & Reactivity
- Conditional & List rendering
- Class & Style binding
- Form handling
- Event handling
- Vue Router
- Composition API

✅ **Giao diện chuyên nghiệp:**
- Design system hiện đại
- Responsive trên mọi thiết bị
- UX/UI thân thiện
- Loading states và error handling

### 8.2. Kinh nghiệm học được

**Technical Skills:**
- Thành thạo Vue.js 3 Composition API
- Sử dụng Vue Router cho SPA
- Quản lý state với ref/reactive
- Integration Bootstrap với Vue
- Client-side data persistence với LocalStorage

**Soft Skills:**
- Phân tích yêu cầu và thiết kế hệ thống
- Tổ chức code theo component pattern
- Debug và troubleshooting
- Viết documentation

### 8.3. Hướng phát triển

Nếu có thêm thời gian, có thể mở rộng:
- [ ] Tích hợp backend API thực sự
- [ ] Rich text editor (TinyMCE, Quill)
- [ ] Upload ảnh từ local
- [ ] Like/Unlike bài viết
- [ ] Categories và Tags
- [ ] Dark/Light theme toggle
- [ ] Export bài viết ra PDF
- [ ] Share lên social media
- [ ] Notification system
- [ ] User roles (Admin/User)

### 8.4. Đánh giá bản thân

**Điểm mạnh:**
- Code sạch, dễ đọc và maintain
- Giao diện đẹp, chuyên nghiệp
- Đầy đủ tính năng theo yêu cầu
- Responsive tốt trên mọi thiết bị

**Điểm cần cải thiện:**
- Có thể thêm unit tests
- Optimize performance hơn
- Accessibility improvements
- SEO optimization

---

## PHẦN 9: TÀI LIỆU THAM KHẢO

1. **Vue.js Official Documentation**: https://vuejs.org/
2. **Vue Router Documentation**: https://router.vuejs.org/
3. **Bootstrap 5 Documentation**: https://getbootstrap.com/
4. **MDN Web Docs**: https://developer.mozilla.org/
5. **JavaScript.info**: https://javascript.info/

---

## PHỤ LỤC

### A. Cấu trúc thư mục chi tiết

```
asm/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── vite.svg
│   │   └── vue.svg
│   ├── components/
│   │   ├── Footer.vue
│   │   └── Navbar.vue
│   ├── router/
│   │   └── index.js
│   ├── utils/
│   │   └── storage.js
│   ├── views/
│   │   ├── CreatePost.vue
│   │   ├── EditPost.vue
│   │   ├── Home.vue
│   │   ├── Login.vue
│   │   ├── PostDetail.vue
│   │   ├── Profile.vue
│   │   └── Register.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── HUONG_DAN_SU_DUNG.md
```

### B. Screenshots

_(Phần này bạn có thể chụp màn hình các trang chính và thêm vào báo cáo)_

1. Trang chủ
2. Trang đăng nhập/đăng ký
3. Trang tạo bài viết
4. Trang chi tiết bài viết
5. Trang profile
6. Mobile view

---

**Ngày hoàn thành**: {{ new Date().toLocaleDateString('vi-VN') }}

**Sinh viên thực hiện**

_[Chữ ký]_

**Nguyễn Tấn Lực - PS45303**
