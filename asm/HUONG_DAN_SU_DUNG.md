# HƯỚNG DẪN SỬ DỤNG ỨNG DỤNG BLOG MANAGER

## 🚀 Bắt đầu nhanh

Ứng dụng đã được khởi chạy tại: **http://localhost:5174/**

## 📖 Hướng dẫn sử dụng từng tính năng

### 1. Đăng ký tài khoản mới

1. Click vào nút **"Đăng ký"** trên thanh navigation
2. Điền thông tin:
   - Họ và tên (tối thiểu 3 ký tự)
   - Email (định dạng email hợp lệ)
   - Mật khẩu (tối thiểu 6 ký tự)
   - Xác nhận mật khẩu
   - Giới thiệu bản thân (tùy chọn)
3. Click **"Đăng ký"**
4. Hệ thống sẽ tự động đăng nhập và chuyển về trang chủ

### 2. Đăng nhập

**Cách 1: Dùng tài khoản demo**
- Email: `user@example.com`
- Password: `123456`

**Cách 2: Dùng tài khoản đã đăng ký**
1. Click **"Đăng nhập"** trên navigation
2. Nhập email và mật khẩu
3. Click **"Đăng nhập"**

### 3. Tạo bài viết mới

1. Sau khi đăng nhập, click **"Đăng bài"** trên navigation
2. Điền thông tin bài viết:
   - **Tiêu đề**: Tối thiểu 10 ký tự, tối đa 200 ký tự
   - **URL hình ảnh**: Nhập link hình ảnh (tùy chọn)
     - Ví dụ: `https://picsum.photos/800/400`
   - **Nội dung**: Tối thiểu 50 ký tự
3. Click **"Đăng bài"**
4. Bài viết sẽ xuất hiện trên trang chủ

**💡 Tips**: 
- Bạn có thể dùng https://picsum.photos để tạo ảnh random
- Nhấn **Ctrl+Enter** khi đang nhập để submit form nhanh

### 4. Xem và tương tác với bài viết

#### Trên trang chủ:
- Xem tất cả bài viết theo thứ tự mới nhất
- Tìm kiếm bài viết theo tiêu đề, nội dung hoặc tác giả
- Click vào bất kỳ bài viết nào để xem chi tiết

#### Trang chi tiết bài viết:
- Đọc toàn bộ nội dung
- Xem thông tin tác giả
- Xem số lượng bình luận
- **Nếu là tác giả**: Có nút Chỉnh sửa và Xóa

### 5. Bình luận vào bài viết

1. Vào trang chi tiết bài viết
2. Scroll xuống phần bình luận
3. Nhập nội dung bình luận
4. Click **"Gửi bình luận"** hoặc nhấn **Ctrl+Enter**
5. Bình luận sẽ hiển thị ngay lập tức

**Xóa bình luận**:
- Chỉ có thể xóa bình luận của chính mình
- Click nút **"Xóa"** bên dưới bình luận
- Xác nhận xóa

### 6. Chỉnh sửa bài viết

1. Vào bài viết của bạn (từ trang chủ hoặc trang Profile)
2. Click nút **"Chỉnh sửa"**
3. Thay đổi tiêu đề, nội dung hoặc hình ảnh
4. Click **"Cập nhật"**

### 7. Xóa bài viết

1. Vào bài viết của bạn
2. Click nút **"Xóa"**
3. Xác nhận xóa trong popup
4. Bài viết sẽ bị xóa vĩnh viễn (không thể khôi phục)

### 8. Quản lý trang cá nhân

#### Xem thông tin cá nhân:
1. Click vào avatar trên navigation
2. Chọn **"Thông tin cá nhân"**
3. Xem:
   - Ảnh đại diện
   - Tên, email, bio
   - Thống kê: Số bài viết và bình luận
   - Danh sách tất cả bài viết của bạn

#### Chỉnh sửa thông tin:
1. Trong trang Profile, click **"Chỉnh sửa hồ sơ"**
2. Cập nhật:
   - Họ và tên
   - Email
   - Giới thiệu bản thân
   - Mật khẩu mới (để trống nếu không đổi)
3. Click **"Lưu thay đổi"**

#### Thay đổi ảnh đại diện:
1. Click vào icon camera trên ảnh đại diện
2. Nhập URL ảnh mới
3. Click **"Lưu"**

**Gợi ý URL ảnh avatar**:
- `https://i.pravatar.cc/150?img=1` (thay số 1-70)
- `https://api.dicebear.com/7.x/avataaars/svg?seed=Felix`

### 9. Đăng xuất

1. Click vào avatar trên navigation
2. Chọn **"Đăng xuất"**
3. Hệ thống sẽ xóa session và chuyển về trang chủ

## 🎨 Tính năng giao diện

### Tìm kiếm bài viết
- Ô tìm kiếm ở trang chủ
- Tìm theo tiêu đề, nội dung, hoặc tên tác giả
- Kết quả hiển thị real-time

### Responsive Design
- Tự động điều chỉnh giao diện theo màn hình
- Hoạt động tốt trên mobile, tablet, desktop

### Dark Theme
- Giao diện tối hiện đại
- Màu sắc tương phản cao, dễ đọc
- Accent color: Sky Blue (#38BDF8)

## 🔑 Một số URL hữu ích cho test

### Hình ảnh cho bài viết:
```
https://picsum.photos/800/400?random=1
https://picsum.photos/800/400?random=2
https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800
```

### Hình ảnh avatar:
```
https://i.pravatar.cc/150?img=5
https://i.pravatar.cc/150?img=12
https://api.dicebear.com/7.x/avataaars/svg?seed=John
```

## ⌨️ Keyboard Shortcuts

- **Ctrl + Enter**: Submit form (khi đang focus vào textarea)
- **Esc**: Đóng modal/popup (trong tương lai)

## 🐛 Xử lý lỗi thường gặp

### Không thấy bài viết
- Kiểm tra đã đăng nhập chưa
- Thử refresh trang (F5)
- Xóa cache trình duyệt và reload

### Không thể đăng bình luận
- Đảm bảo đã đăng nhập
- Kiểm tra nội dung bình luận không để trống

### Mất dữ liệu
- Dữ liệu lưu trong LocalStorage
- Không xóa browser cache/history
- Không dùng chế độ Incognito để test lâu dài

## 💡 Best Practices

### Khi tạo bài viết:
1. Tiêu đề ngắn gọn, súc tích (50-100 ký tự)
2. Nội dung chia thành đoạn văn rõ ràng
3. Thêm hình ảnh để bài viết sinh động hơn
4. Review trước khi đăng

### Khi bình luận:
1. Nội dung lịch sự, xây dựng
2. Không spam
3. Không trùng lặp nội dung

### Bảo mật:
1. Không dùng mật khẩu thật (đây chỉ là demo)
2. Không nhập thông tin cá nhân nhạy cảm
3. Dữ liệu lưu trên máy local, không gửi lên server

## 📞 Hỗ trợ

Nếu gặp vấn đề kỹ thuật:
1. Kiểm tra Console (F12) để xem lỗi
2. Thử xóa LocalStorage: `localStorage.clear()` trong Console
3. Reload lại trang

---

**Chúc bạn sử dụng ứng dụng vui vẻ! 🎉**
