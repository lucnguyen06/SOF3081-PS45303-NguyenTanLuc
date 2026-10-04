# Ứng Dụng Quản Lý Trang Blog

Ứng dụng web quản lý blog được xây dựng với **Vue.js 3** và **Bootstrap 5**. Dự án này là bài assignment cho môn học **SOF3081 - Xây dựng giao diện tương tác Backend**.

## 🎯 Mục tiêu dự án

Xây dựng một ứng dụng blog hoàn chỉnh cho phép người dùng:
- Đăng ký và đăng nhập tài khoản
- Tạo, chỉnh sửa và xóa bài viết
- Bình luận vào các bài viết
- Quản lý thông tin cá nhân

## ✨ Tính năng chính

### 1. Xác thực người dùng (Authentication)
- ✅ Đăng ký tài khoản mới
- ✅ Đăng nhập với email và mật khẩu
- ✅ Đăng xuất
- ✅ Bảo vệ route với navigation guard

### 2. Quản lý bài viết
- ✅ Tạo bài viết mới với tiêu đề, nội dung và hình ảnh
- ✅ Chỉnh sửa bài viết của mình
- ✅ Xóa bài viết của mình
- ✅ Xem danh sách tất cả bài viết
- ✅ Xem chi tiết bài viết
- ✅ Tìm kiếm bài viết

### 3. Bình luận
- ✅ Thêm bình luận vào bài viết
- ✅ Xóa bình luận của mình
- ✅ Hiển thị số lượng bình luận

### 4. Trang cá nhân
- ✅ Xem thông tin cá nhân
- ✅ Chỉnh sửa thông tin (tên, email, bio)
- ✅ Đổi mật khẩu
- ✅ Cập nhật ảnh đại diện
- ✅ Xem danh sách bài viết của mình
- ✅ Thống kê số bài viết và bình luận

## 🛠️ Công nghệ sử dụng

- **Vue.js 3** - Progressive JavaScript Framework
- **Vue Router 4** - Official router for Vue.js
- **Bootstrap 5.3.8** - CSS Framework (sử dụng thư mục local)
- **Bootstrap Icons** - Icon library (CDN)
- **Vite** - Build tool and development server
- **LocalStorage** - Client-side data persistence

## 📦 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js >= 16.x
- npm hoặc yarn

### Các bước cài đặt

1. **Clone repository**
```bash
git clone <repository-url>
cd asm
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Chạy development server**
```bash
npm run dev
```

Ứng dụng sẽ chạy tại: http://localhost:5174/

4. **Build cho production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

## 📁 Cấu trúc dự án

```
asm/
├── bootstrap-5.3.8-dist/   # Bootstrap framework (local)
│   ├── css/
│   │   └── bootstrap.min.css
│   └── js/
│       └── bootstrap.bundle.min.js
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/          # Tài nguyên tĩnh (images, icons)
│   ├── components/      # Vue components
│   │   ├── Navbar.vue
│   │   └── Footer.vue
│   ├── views/          # Các trang chính
│   │   ├── Home.vue
│   │   ├── Login.vue
│   │   ├── Register.vue
│   │   ├── CreatePost.vue
│   │   ├── EditPost.vue
│   │   ├── PostDetail.vue
│   │   └── Profile.vue
│   ├── router/         # Vue Router configuration
│   │   └── index.js
│   ├── utils/          # Utility functions
│   │   └── storage.js  # LocalStorage management
│   ├── App.vue         # Root component
│   └── main.js         # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Thiết kế giao diện

Ứng dụng sử dụng **design system hiện đại** với:
- **Color Palette**: Deep navy (#0F172A, #1E293B) với accent màu sky blue (#38BDF8)
- **Typography**: Inter font family (Google Fonts)
- **Layout**: Responsive design với Bootstrap Grid System
- **Components**: Custom styled với border-radius lớn, subtle shadows
- **Animations**: Smooth transitions và hover effects

## 💾 Quản lý dữ liệu

Dự án sử dụng **LocalStorage** để lưu trữ dữ liệu:

### Users
```javascript
{
  id: string,
  name: string,
  email: string,
  password: string,
  avatar: string,
  bio: string,
  createdAt: string
}
```

### Posts
```javascript
{
  id: string,
  title: string,
  content: string,
  image: string,
  authorId: string,
  authorName: string,
  authorAvatar: string,
  createdAt: string,
  updatedAt: string,
  comments: []
}
```

### Comments
```javascript
{
  id: string,
  content: string,
  authorId: string,
  authorName: string,
  authorAvatar: string,
  createdAt: string
}
```

## 🔐 Tài khoản demo

Để test nhanh ứng dụng, sử dụng tài khoản demo:
- **Email**: user@example.com
- **Password**: 123456

## 📱 Responsive Design

Ứng dụng được tối ưu cho các kích thước màn hình:
- 📱 Mobile: < 576px
- 📱 Tablet: 576px - 991px
- 💻 Desktop: >= 992px

## 🚀 Các kiến thức Vue.js được áp dụng

### 1. Template Syntax
- Interpolation: `{{ data }}`
- Directives: `v-if`, `v-for`, `v-show`, `v-bind`, `v-on`
- Event handling: `@click`, `@submit`

### 2. Reactivity
- `ref()` và `reactive()` từ Composition API
- `computed()` cho derived state
- Watch và watchEffect

### 3. Component Communication
- Props và emits
- Provide/inject pattern

### 4. Lifecycle Hooks
- `onMounted()`, `onUnmounted()`
- Setup function trong Composition API

### 5. Vue Router
- Route configuration
- Dynamic routes (:id)
- Navigation guards (beforeEach)
- Protected routes (meta.requiresAuth)
- Programmatic navigation (router.push)

### 6. Form Handling
- Two-way binding với `v-model`
- Form validation
- Event modifiers: `@submit.prevent`

### 7. Conditional & List Rendering
- `v-if`, `v-else-if`, `v-else`
- `v-for` với key binding
- `v-show` cho toggle visibility

### 8. Class & Style Binding
- `:class` dynamic classes
- `:style` inline styles
- Conditional styling

## 🎓 Kiến thức Bootstrap được áp dụng

- Grid System (Container, Row, Col)
- Typography và Spacing utilities
- Form components
- Button styles
- Modal component
- Dropdown menu
- Responsive utilities
- Flexbox utilities

## ⚠️ Lưu ý quan trọng

### Bootstrap Local
Dự án sử dụng **Bootstrap từ thư mục local** (`bootstrap-5.3.8-dist/`) thay vì npm:
- CSS: `/bootstrap-5.3.8-dist/css/bootstrap.min.css`
- JS: `/bootstrap-5.3.8-dist/js/bootstrap.bundle.min.js`
- Icons: Bootstrap Icons từ CDN

### Dữ liệu
- Dữ liệu được lưu trong LocalStorage, sẽ mất khi xóa browser cache
- Đây là ứng dụng demo, không có backend thực sự
- Password được lưu dạng plain text (chỉ để học tập)
- Validation được thực hiện ở client-side

## 🔄 Tính năng mở rộng (Optional)

Các tính năng có thể thêm vào:
- [ ] Like/Unlike bài viết
- [ ] Bookmark bài viết
- [ ] Categories/Tags cho bài viết
- [ ] Rich text editor
- [ ] Image upload từ local
- [ ] Dark/Light theme toggle
- [ ] Export bài viết ra PDF
- [ ] Share bài viết lên mạng xã hội

## 👨‍💻 Tác giả

**Nguyễn Tấn Lực**
- MSSV: PS45303
- Môn học: SOF3081 - Xây dựng giao diện tương tác Backend

## 📝 License

Dự án này được tạo cho mục đích học tập.

---

**Ngày hoàn thành**: 5 tháng 10, 2026
