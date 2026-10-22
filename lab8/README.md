# SOF3081 - Lab 8: Xây Dựng Giao Diện Tương Tác Backend (Vue Router)

**Sinh viên thực hiện:** PS45303 - Nguyễn Tấn Lực  
**Môn học:** SOF3081 - Xây dựng Giao diện Tương tác Backend (Vue.js)  
**Ứng dụng:** MyBlog

---

## 🎯 Mục Tiêu Bài Thực Hành
Thực hành và củng cố hiểu biết về **Vue Router 4** bằng cách triển khai các tính năng chính:
- **Routes lồng nhau (Nested Routes)**
- **Routes động (Dynamic Routes)**
- **Bảo vệ Routes với xác thực giả lập (Navigation Guards & Authentication)**
- **Tên Routes (Named Routes)**
- **Alias Routes**
- **Điều hướng bằng `<router-link>` và Điều hướng lập trình (`this.$router.push`)**

---

## 📂 Cấu Trúc Dự Án Lab 8 (MyBlog)
```
lab8/
├── index.html                       # Trang HTML chính của ứng dụng MyBlog
├── package.json                     # Quản lý dependencies (Vue 3, Vue Router 4, Bootstrap 5)
├── vite.config.js                   # Cấu hình Vite build tool
├── README.md                        # Tài liệu hướng dẫn và báo cáo bài làm
├── public/
│   └── vite.svg
└── src/
    ├── App.vue                      # Layout chính: Navbar Bootstrap 5, Route Tracker, Footer
    ├── main.js                      # Điểm khởi tạo ứng dụng, đăng ký router & Bootstrap
    ├── style.css                    # Tùy biến CSS giao diện
    ├── data/
    │   └── blogs.js                 # Dữ liệu mẫu danh sách bài viết blog
    ├── utils/
    │   └── auth.js                  # Quản lý trạng thái xác thực giả lập (localStorage & reactive ref)
    ├── router/
    │   └── index.js                 # Cấu hình routes, nested routes, alias, router guard
    └── views/
        ├── Home.vue                 # Yêu cầu 2: Trang chủ chào mừng đến MyBlog
        ├── BlogList.vue             # Yêu cầu 2: Danh sách các bài viết blog
        ├── BlogPost.vue             # Yêu cầu 2 & 3b: Chi tiết bài viết theo route động /blog/:id
        ├── UserProfile.vue          # Yêu cầu 2, 3a, 3e: Trang hồ sơ với nested route & alias /me
        ├── UserInfo.vue             # Yêu cầu 3a: Route con 1 (/profile/info) thông tin người dùng
        ├── UserSettings.vue         # Yêu cầu 3a: Route con 2 (/profile/settings) cài đặt người dùng
        ├── Login.vue                # Yêu cầu 2 & 3c: Trang đăng nhập cập nhật isAuthenticated
        └── Dashboard.vue            # Yêu cầu 2 & 3c: Route bảo vệ chỉ truy cập khi đã xác thực
```

---

## 📝 Chi Tiết Thực Hiện Các Yêu Cầu

### PHẦN I: Thiết lập ứng dụng và tạo Component
- **Yêu cầu 1 (2 điểm):** 
  - Khởi tạo dự án Vue.js hoàn chỉnh với Vite.
  - Cài đặt và tích hợp `vue-router` phiên bản 4.
- **Yêu cầu 2 (3 điểm):**
  - `Home.vue`: Trang chủ giới thiệu MyBlog, cung cấp liên kết nhanh và trình diễn điều hướng.
  - `BlogList.vue`: Hiển thị danh sách bài viết dạng Card chuyên nghiệp kèm thông tin tác giả, ngày đăng.
  - `BlogPost.vue`: Trang chi tiết bài viết nhận tham số động `:id`.
  - `UserProfile.vue`: Trang thông tin người dùng chứa `<router-view>` và tab chuyển đổi.
  - `Login.vue`: Trang đăng nhập giả lập cập nhật trạng thái `isAuthenticated` vào `localStorage`.
  - `Dashboard.vue`: Bảng điều khiển quản trị hiển thị các thống kê và danh sách bài viết.

---

### PHẦN II: Triển khai các Routers (Yêu cầu 3 - 5 điểm)

#### a. Routes lồng nhau (Nested Routes)
- Định nghĩa trong `src/router/index.js`:
  ```javascript
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    alias: '/me',
    children: [
      { path: '', redirect: { name: 'UserInfo' } },
      { path: 'info', name: 'UserInfo', component: UserInfo },
      { path: 'settings', name: 'UserSettings', component: UserSettings }
    ]
  }
  ```
- Component `UserProfile.vue` chứa thẻ `<router-view></router-view>` để hiển thị nội dung của `UserInfo.vue` hoặc `UserSettings.vue`.

#### b. Routes động (Dynamic Routes)
- Tuyến đường `/blog/:id` truyền tham số `id`:
  ```javascript
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: BlogPost,
    props: true
  }
  ```
- `BlogPost.vue` lấy giá trị tham số qua `this.$route.params.id` hoặc `props: ['id']` để truy xuất bài viết tương ứng và render ra màn hình.
- Có nút chuyển bài viết trước / bài viết sau bằng lệnh lập trình.

#### c. Bảo vệ Routes với xác thực giả lập (Route Guards)
- Đánh dấu route nhạy cảm với `meta: { requiresAuth: true }` cho `/dashboard`.
- Triển khai Global Navigation Guard:
  ```javascript
  router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
      next({ name: 'Login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  });
  ```
- Trong `Login.vue`: Khi bấm đăng nhập, gọi `localStorage.setItem('isAuthenticated', 'true')` và chuyển hướng đến Dashboard.
- Trong `Dashboard.vue`: Có nút Đăng xuất xóa `isAuthenticated` và chuyển hướng về Login.

#### d. Tên Routes (Named Routes) & Điều hướng Lập trình
- Toàn bộ các routes đều được gán `name`: `Home`, `BlogList`, `BlogPost`, `UserProfile`, `UserInfo`, `UserSettings`, `Login`, `Dashboard`.
- Sử dụng phương thức:
  ```javascript
  this.$router.push({ name: 'routeName' });
  // Hoặc truyền kèm params:
  this.$router.push({ name: 'BlogPost', params: { id: 1 } });
  ```
- Trong giao diện có các nút tương ứng minh họa rõ ràng tính năng điều hướng bằng code.

#### e. Alias Routes
- Cấu hình alias `/me` cho tuyến đường `/profile`:
  ```javascript
  path: '/profile',
  alias: '/me',
  component: UserProfile,
  ...
  ```
- Khi truy cập URL `/me`, người dùng vẫn xem được component `UserProfile` và các routes con `/me/info`, `/me/settings`.
- Thanh Route Tracker trên Header hiển thị trực quan URL đang truy cập.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### 1. Di chuyển vào thư mục bài Lab 8:
```bash
cd lab8
```

### 2. Cài đặt các gói phụ thuộc (nếu chưa cài):
```bash
npm install
```

### 3. Chạy môi trường phát triển (Development Server):
```bash
npm run dev
```

### 4. Build sản phẩm (Production Build):
```bash
npm run build
```
