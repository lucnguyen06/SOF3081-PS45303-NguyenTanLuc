# 📦 HƯỚNG DẪN NỘP BÀI

## ✅ CÁC FILE/FOLDER CẦN NỘP:

```
asm/
├── 📄 package.json           ← Dependencies config
├── 📄 vite.config.js         ← Vite config
├── 📄 index.html             ← Entry HTML
├── 📄 README.md              ← Hướng dẫn chung
├── 📄 BAO_CAO_DO_AN.md       ← Báo cáo đồ án
├── 📄 CHECKLIST.md           ← Checklist yêu cầu
├── 📄 HUONG_DAN_SU_DUNG.md   ← Hướng dẫn sử dụng
├── 📄 .gitignore             ← Git ignore config
│
├── 📁 bootstrap-5.3.8-dist/  ← Bootstrap framework (CẦN THIẾT)
│   ├── css/
│   └── js/
│
├── 📁 public/                ← Static assets
│   ├── favicon.svg
│   └── icons.svg
│
└── 📁 src/                   ← Source code
    ├── App.vue
    ├── main.js
    ├── assets/
    │   ├── hero.png
    │   ├── light-theme.css
    │   └── *.svg
    ├── components/
    │   ├── Footer.vue
    │   ├── Navbar.vue
    │   └── HelloWorld.vue
    ├── router/
    │   └── index.js
    ├── utils/
    │   └── storage.js
    └── views/
        ├── Home.vue
        ├── Login.vue
        ├── Register.vue
        ├── Profile.vue
        ├── CreatePost.vue
        ├── EditPost.vue
        └── PostDetail.vue
```

---

## ❌ KHÔNG NỘP CÁC FILE/FOLDER SAU:

```
❌ node_modules/         ← ~20MB, tự động tạo khi npm install
❌ package-lock.json     ← Tự động generate
❌ dist/                 ← Build output, không cần
❌ .vite/                ← Cache folder
❌ *.log                 ← Log files
```

---

## 📝 CÁCH NỘP BÀI:

### Cách 1: Nén thư mục (Khuyến nghị)

1. **Đóng tất cả terminal/dev server** (Ctrl+C)
2. **Xóa node_modules** (nếu chưa xóa):
   ```bash
   # Trong PowerShell
   Remove-Item -Recurse -Force node_modules
   ```
3. **Nén thư mục `asm/`** thành file ZIP
4. **Đổi tên**: `PS45303_NguyenTanLuc_SOF3081.zip`
5. **Nộp lên hệ thống**

### Cách 2: Qua Git repository

```bash
# Add files
git add .

# Commit
git commit -m "Hoàn thành đồ án SOF3081"

# Push lên GitHub/GitLab
git push origin main
```

---

## 🔍 KIỂM TRA TRƯỚC KHI NỘP:

### ✅ Checklist:

- [ ] File `package.json` có đầy đủ dependencies
- [ ] Thư mục `src/` có đầy đủ 7 views
- [ ] Thư mục `bootstrap-5.3.8-dist/` có đầy đủ CSS & JS
- [ ] File `BAO_CAO_DO_AN.md` đã hoàn thiện
- [ ] File `CHECKLIST.md` đã đánh dấu hoàn thành
- [ ] File `HUONG_DAN_SU_DUNG.md` có hướng dẫn chi tiết
- [ ] **KHÔNG CÓ** thư mục `node_modules/`
- [ ] **KHÔNG CÓ** file `package-lock.json`

### 📊 Kiểm tra dung lượng:

```
✅ Tổng dung lượng sau khi xóa node_modules: ~8-10 MB
❌ Nếu >20 MB: Chưa xóa node_modules
```

---

## 🚀 HƯỚNG DẪN GIÁO VIÊN CHẠY PROJECT:

Giáo viên sẽ giải nén và chạy:

```bash
# 1. Giải nén file zip
unzip PS45303_NguyenTanLuc_SOF3081.zip

# 2. Vào thư mục
cd asm

# 3. Cài đặt dependencies
npm install

# 4. Chạy dev server
npm run dev

# 5. Mở trình duyệt: http://localhost:5173
```

---

## 📋 NỘI DUNG FILE README.md

Đảm bảo `README.md` có:

- Thông tin sinh viên (Tên, MSSV, Lớp)
- Mô tả dự án
- Công nghệ sử dụng
- Hướng dẫn cài đặt
- Hướng dẫn chạy
- Chức năng đã hoàn thành
- Screenshots (nếu có)

---

## ⚠️ LƯU Ý QUAN TRỌNG:

1. **Bootstrap phải là folder local** (`bootstrap-5.3.8-dist/`), không dùng CDN
2. **Không dùng CDN** cho Bootstrap CSS/JS
3. **Xóa node_modules** trước khi nén
4. **Kiểm tra file `index.html`** đảm bảo đường dẫn Bootstrap đúng:
   ```html
   <link rel="stylesheet" href="./bootstrap-5.3.8-dist/css/bootstrap.min.css">
   <script src="./bootstrap-5.3.8-dist/js/bootstrap.bundle.min.js"></script>
   ```

---

## 📞 HỖ TRỢ:

Nếu có vấn đề:
1. Đọc lại `HUONG_DAN_SU_DUNG.md`
2. Kiểm tra `CHECKLIST.md`
3. Xem `BAO_CAO_DO_AN.md` phần "Vấn đề và giải pháp"

---

**Chúc bạn nộp bài thành công! 🎉**
