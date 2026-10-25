# BÀI KIỂM TRA FINAL - MÔN SOF308 / SOF306
**XÂY DỰNG GIAO DIỆN TƯƠNG TÁC BACKEND**  
**Sinh viên thực hiện:** Nguyễn Tấn Lực  
**Mã số sinh viên (MSSV):** PS45303  
**Lớp:** SOF3081  

---

## 1. Yêu cầu đề bài

### Bài 1: Tạo 3 trang như mô tả ở các hình
1. **`Home.vue`**:
   - Hiển thị tiêu đề môn học `SOF308` và thanh liên kết `Home -- QL Sinh vien`.
   - Hiển thị text `Home page` và link `Go to QL Sinh vien` dẫn sang trang Quản lý sinh viên.
2. **`Login.vue`**:
   - Thiết kế form đăng nhập gồm `Username`, `Password` (placeholder tương ứng `Nhap username`, `Nhap password`).
   - Nút bấm `Login` màu xanh lá (Bootstrap `btn-success`).
3. **`QuanLySinhVien.vue`**:
   - Tiêu đề: `Quan ly Sinh vien`.
   - Cột trái: `Them sinh vien` gồm ô nhập `Ten sinh vien`, `Tuoi` và nút bấm `Them sinh vien`.
   - Cột phải: `Danh sach sinh vien` (tiêu đề màu đỏ) hiển thị danh sách sinh viên ban đầu:
     - `Tran Quang Anh - 18 tuoi`
     - `Le Thi Lan - 19 tuoi`
     - `Pham Van Bao - 18 tuoi`

---

### Bài 2: Viết code cho các trang theo yêu cầu:
1. **`Login.vue`**:
   - Xử lý sự kiện đăng nhập khi người dùng nhấn nút `Login`.
   - Kiểm tra validation (không được để trống Username và Password).
   - Lưu trạng thái đăng nhập vào hệ thống (`isAuthenticated = true` và `currentUser`).
   - Thiết lập **Route Guard (Navigation Guard)**: Người dùng chưa đăng nhập khi truy cập `/quan-ly-sinh-vien` sẽ tự động bị chuyển hướng sang `/login`. Đăng nhập thành công sẽ được chuyển tiếp sang trang Quản lý sinh viên.
   - Hỗ trợ chức năng Đăng xuất để xóa session và kiểm tra lại Route Guard.
2. **`QuanLySinhVien.vue`**:
   - Quản lý danh sách sinh viên phản ứng (reactive state) với các dữ liệu mẫu ban đầu.
   - Sử dụng `v-model` binding 2 chiều cho `tenSinhVien` và `tuoi`.
   - Xử lý hàm `themSinhVien()`: kiểm tra tính hợp lệ (tên không rỗng, tuổi > 0), thêm sinh viên vào mảng, xóa trắng form sau khi thêm.
   - Render danh sách động bằng chỉ thị `v-for`.
   - Hỗ trợ xóa sinh viên khỏi danh sách.

---

## 2. Hướng dẫn cài đặt và chạy dự án

### Cài đặt dependencies:
```bash
cd final
npm install
```

### Chạy ở môi trường Development:
```bash
npm run dev
```
Truy cập trình duyệt tại: `http://localhost:3000` hoặc cổng được Vite cung cấp.

### Build bản Production:
```bash
npm run build
```
Thư mục xuất bản sẽ nằm tại `final/dist`.

---

## 3. Cấu trúc thư mục dự án `final`

```
final/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── style.css
│   ├── data/
│   │   └── db.json          <-- File JSON lưu trữ dữ liệu tài khoản (tk) & sinh viên (data)
│   ├── router/
│   │   └── index.js
│   ├── utils/
│   │   ├── auth.js          <-- Quản lý trạng thái xác thực và đăng nhập
│   │   └── dbService.js     <-- Service đọc/ghi dữ liệu JSON và đồng bộ Vite API / localStorage
│   └── views/
│       ├── Home.vue
│       ├── Login.vue
│       └── QuanLySinhVien.vue
└── dist/

---

## 4. Cơ chế lưu trữ JSON Data khi chạy `npm run dev`

Dự án tích hợp cơ chế lưu trữ hai tầng (Two-layer JSON Persistence):
1. **Lưu trực tiếp vào file `src/data/db.json` trên ổ đĩa**:
   - Khi chạy lệnh `npm run dev`, Vite server middleware (`vite-plugin-json-db` trong `vite.config.js`) tự động cung cấp API `/api/db`.
   - Mọi thao tác thêm/xóa sinh viên (`data`) hoặc đăng ký tài khoản mới (`tk`) từ giao diện sẽ được **ghi đè và lưu trực tiếp vào file `src/data/db.json`**.
   - Dù bạn tắt server và chạy lại `npm run dev`, toàn bộ dữ liệu mới vẫn được bảo toàn nguyên vẹn trong file JSON.
2. **Đồng bộ song song `localStorage`**:
   - Giúp ứng dụng hoạt động mượt mà ngay cả khi chạy ở chế độ standalone (mở file `final.html`) hoặc production build (`dist/`).
3. **Danh sách tài khoản mẫu ban đầu trong `src/data/db.json`**:
   - Tài khoản 1: `admin` / Mật khẩu: `123`
   - Tài khoản 2: `sinhvien` / Mật khẩu: `123`
│   │   └── auth.js
│   └── views/
│       ├── Home.vue
│       ├── Login.vue
│       └── QuanLySinhVien.vue
└── dist/
```
