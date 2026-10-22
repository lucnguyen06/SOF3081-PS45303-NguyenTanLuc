export const blogs = [
  {
    id: 1,
    title: 'Khám phá Vue Router 4 và các tính năng nâng cao',
    author: 'Nguyễn Tấn Lực',
    date: '18/10/2026',
    category: 'Vue.js',
    summary: 'Tìm hiểu cách sử dụng Dynamic Routes, Nested Routes, Route Guards và Alias trong Vue Router 4.',
    content: `Vue Router là bộ định tuyến chính thức của Vue.js, cung cấp giải pháp mạnh mẽ cho các ứng dụng Single Page Application (SPA).

Trong phiên bản Vue Router 4 dành cho Vue 3, chúng ta có các tính năng nổi bật:
1. Dynamic Route Matching: Cho phép ánh xạ các route có cấu trúc giống nhau vào cùng một component thông qua các đoạn tham số động như /blog/:id.
2. Nested Routes (Route lồng nhau): Hỗ trợ phân cấp giao diện phức tạp bằng cách nhúng thẻ <router-view> bên trong một component cha.
3. Navigation Guards: Kiểm soát quyền truy cập và bảo vệ các tuyến đường nhạy cảm như /dashboard.
4. Route Names & Programmatic Navigation: Điều hướng bằng tên route linh hoạt với router.push({ name: '...' }).
5. Route Alias: Cho phép truy cập cùng một component với các URL thay thế như /me cho /profile.`
  },
  {
    id: 2,
    title: 'Xây dựng giao diện hiện đại với Bootstrap 5 trong Vue 3',
    author: 'Trần Minh Đức',
    date: '19/10/2026',
    category: 'Frontend',
    summary: 'Cách tích hợp hệ thống Grid và các thành phần giao diện của Bootstrap 5 vào dự án Vue.',
    content: `Bootstrap 5 mang đến nhiều cải tiến đáng kể so với các phiên bản trước:
- Loại bỏ hoàn toàn sự phụ thuộc vào jQuery, chuyển sang sử dụng Vanilla JavaScript.
- Hệ thống CSS Grid và Flexbox tối ưu, giúp xây dựng layout responsive dễ dàng trên mọi kích thước màn hình.
- Kho tiện ích (Utility classes) phong phú về màu sắc, khoảng cách, căn chỉnh và typography.

Khi kết hợp Bootstrap 5 với hệ thống component phản ứng (reactive components) của Vue 3, chúng ta có thể tạo ra các ứng dụng vừa có giao diện chuẩn mực, vừa có trải nghiệm người dùng mượt mà.`
  },
  {
    id: 3,
    title: 'Bảo mật ứng dụng SPA với Route Guards và Token Authentication',
    author: 'Lê Hoàng Yến',
    date: '20/10/2026',
    category: 'Security',
    summary: 'Chiến lược bảo vệ các trang nhạy cảm và kiểm soát phân quyền trong ứng dụng Vue.',
    content: `Trong các ứng dụng Single Page Application, bảo mật ở phía client đóng vai trò quan trọng trong việc đem lại trải nghiệm liền mạch:

1. Global Before Guards: Sử dụng router.beforeEach() để kiểm tra trạng thái xác thực (authentication) trước khi mỗi điều hướng diễn ra.
2. Route Meta Fields: Gán trường meta: { requiresAuth: true } cho các route cần bảo vệ.
3. Chuyển hướng thông minh: Khi người dùng chưa đăng nhập cố gắng vào trang được bảo vệ, lưu lại URL đích và chuyển hướng họ sang trang đăng nhập (/login). Sau khi đăng nhập thành công, tự động quay trở lại trang ban đầu.`
  }
];
