# SOF3081 - Lab 7: Xây Dựng Giao Diện Tương Tác Backend

**Sinh viên thực hiện:** PS45303 - Nguyễn Tấn Lực  
**Môn học:** SOF3081 - Lập trình Front-End Frameworks (Vue.js)

---

## 🎯 Mục Tiêu Bài Thực Hành
- Lắng nghe và xử lý sự kiện trong Vue.js (`v-on`, `@click`, `@submit.prevent`, modifier...).
- Sử dụng hai chiều dữ liệu (two-way data binding) với `v-model`.
- Kiểm tra tính hợp lệ của Form (Form Validation) kết hợp chỉ thị `v-if`.
- Cơ chế truyền nhận dữ liệu và giao tiếp giữa các Component thông qua `props` và `emit`.

---

## 📂 Cấu Trúc Dự Án Lab 7
```
lab7/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.vue                         # Layout chính với điều hướng tabs
    ├── main.js                         # Khởi tạo Vue app, import Bootstrap 5
    ├── style.css                       # Tùy biến style giao diện
    └── components/
        ├── Bai1.vue                    # Bài 1: Quản lý công việc (Event Handling)
        ├── Bai2.vue                    # Bài 2: Form Đăng nhập & Validation (v-if)
        ├── Bai3.vue                    # Bài 3: Form Đăng ký người dùng (v-model Form Binding)
        ├── Bai4.vue                    # Bài 4: Quản lý hiển thị component chính
        ├── LoginComponent.vue          # Bài 4: Component Form Đăng nhập (phát sự kiện emit)
        └── CommentComponent.vue        # Bài 4: Component Bình luận (nhận props username)
```

---

## 📝 Chi Tiết Các Bài Tập

### Bài 1: Quản lý công việc (2 điểm)
- Thêm mới công việc vào danh sách bằng sự kiện `@submit.prevent` trên form.
- Kiểm tra dữ liệu đầu vào, ngăn ngừa công việc trống.
- Hiển thị danh sách công việc linh hoạt (`v-for`) kèm nút **Xóa** từng công việc theo index.
- Hiển thị số lượng công việc hiện có.

### Bài 2: Form Đăng nhập & Validation (3 điểm)
- Sử dụng `v-model` binding hai chiều cho trường Email và Mật khẩu.
- Form Validation hiển thị lỗi bằng `v-if`:
  - Email bắt buộc, đúng định dạng RegEx.
  - Mật khẩu bắt buộc.
- Sử dụng `@submit.prevent` trên form ngăn tải lại trang web khi submit.
- Khi đăng nhập thành công: Chuyển sang màn hình chào mừng kèm nút **Đăng xuất** để reset form và quay lại màn hình đăng nhập.

### Bài 3: Form Đăng ký người dùng (2 điểm)
- Thực hiện liên kết dữ liệu Form binding hoàn chỉnh:
  - Họ tên, Email, Mật khẩu (bảo mật, không in ra màn hình kết quả).
  - Ngày sinh (`date`).
  - Giới tính (`radio`: Nam / Nữ / Khác).
  - Ngôn ngữ (`checkbox`: Tiếng Việt / Tiếng Anh / Tiếng Nhật).
- Bấm nút **Đăng ký** hiển thị chi tiết các thông tin người dùng vừa nhập bên cột kết quả.

### Bài 4: Ứng dụng bình luận bài viết (3 điểm)
- Phân tách kiến trúc 3 component rõ ràng:
  1. `LoginComponent.vue`: Chứa form nhập tên và mật khẩu, phát ra sự kiện `emit('loggedIn', username)`.
  2. `CommentComponent.vue`: Nhận prop `username` hiển thị tên người bình luận, gửi bình luận mới và hiển thị danh sách bài viết + bình luận.
  3. `Bai4.vue`: Quản lý trạng thái và luân chuyển giao diện mượt mà giữa Đăng nhập và Bình luận.

---

## 🚀 Hướng Dẫn Chạy Dự Án
```bash
# 1. Di chuyển vào thư mục lab7
cd lab7

# 2. Cài đặt các gói phụ thuộc (nếu chưa cài)
npm install

# 3. Chạy môi trường phát triển (Dev server)
npm run dev

# 4. Mở trình duyệt tại địa chỉ hiển thị trên terminal (thường là http://localhost:5173)
```
