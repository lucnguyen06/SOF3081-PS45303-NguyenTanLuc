import { reactive } from 'vue';
import initialDb from '../data/db.json';

const STORAGE_KEY = 'final_sof308_db';

// Khởi tạo state phản ứng chứa accounts và students
export const dbState = reactive({
  accounts: [],
  students: [],
  isLoaded: false,
  isServerSync: false
});

// Hàm khởi tạo nạp dữ liệu (từ API Vite dev server hoặc fallback localStorage / file db.json)
export async function initDatabase() {
  try {
    // Thử gọi API từ Vite dev server (lưu trực tiếp vào file src/data/db.json trên ổ đĩa)
    const res = await fetch('/api/db');
    if (res.ok) {
      const data = await res.json();
      dbState.accounts = data.accounts || [];
      dbState.students = data.students || [];
      dbState.isServerSync = true;
      dbState.isLoaded = true;
      // Đồng bộ vào localStorage làm bản backup
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return;
    }
  } catch (err) {
    // Không kết nối được API (chạy production build hoặc mở file standalone)
  }

  // Fallback 1: Lấy từ localStorage nếu đã có
  const localData = localStorage.getItem(STORAGE_KEY);
  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      dbState.accounts = parsed.accounts || [];
      dbState.students = parsed.students || [];
      dbState.isLoaded = true;
      return;
    } catch (e) {
      console.error('Lỗi đọc localStorage:', e);
    }
  }

  // Fallback 2: Lấy dữ liệu mặc định từ file db.json được import
  dbState.accounts = [...initialDb.accounts];
  dbState.students = [...initialDb.students];
  dbState.isLoaded = true;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    accounts: dbState.accounts,
    students: dbState.students
  }));
}

// Lưu dữ liệu vào file db.json (khi chạy npm run dev) và lưu localStorage
export async function persistDatabase() {
  const payload = {
    accounts: dbState.accounts,
    students: dbState.students
  };

  // Luôn cập nhật localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

  // Gửi lên server Vite để ghi thẳng vào file src/data/db.json trên ổ đĩa
  try {
    const res = await fetch('/api/db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      dbState.isServerSync = true;
      return true;
    }
  } catch (err) {
    console.warn('Không thể ghi vào file qua API /api/db, đã lưu vào localStorage.', err);
  }
  return false;
}

// --- QUẢN LÝ SINH VIÊN (DATA) ---

// Thêm sinh viên mới
export async function addStudent(student) {
  const newId = Date.now();
  const newStudent = {
    id: newId,
    ten: student.ten.trim(),
    tuoi: parseInt(student.tuoi, 10)
  };
  dbState.students.push(newStudent);
  await persistDatabase();
  return newStudent;
}

// Cập nhật thông tin sinh viên
export async function updateStudent(index, student) {
  if (index >= 0 && index < dbState.students.length) {
    dbState.students[index] = {
      ...dbState.students[index],
      ten: student.ten.trim(),
      tuoi: parseInt(student.tuoi, 10)
    };
    await persistDatabase();
    return dbState.students[index];
  }
  return null;
}

// Xóa sinh viên theo index hoặc id
export async function deleteStudent(indexOrId) {
  if (typeof indexOrId === 'number' && indexOrId < dbState.students.length) {
    dbState.students.splice(indexOrId, 1);
  } else {
    const idx = dbState.students.findIndex(s => s.id === indexOrId);
    if (idx !== -1) {
      dbState.students.splice(idx, 1);
    }
  }
  await persistDatabase();
}

// --- QUẢN LÝ TÀI KHOẢN (TK) ---

// Kiểm tra thông tin đăng nhập
export function checkCredentials(username, password) {
  const u = username.trim().toLowerCase();
  const p = password.trim();

  // Tìm trong danh sách accounts
  const account = dbState.accounts.find(
    acc => acc.username.toLowerCase() === u && acc.password === p
  );
  return account || null;
}

// Thêm/Đăng ký tài khoản mới và lưu vào db.json
export async function registerAccount(accountData) {
  const existing = dbState.accounts.find(
    acc => acc.username.toLowerCase() === accountData.username.trim().toLowerCase()
  );
  if (existing) {
    return { success: false, message: 'Tên tài khoản này đã tồn tại!' };
  }

  const newAccount = {
    id: Date.now(),
    username: accountData.username.trim(),
    password: accountData.password.trim(),
    fullName: accountData.fullName ? accountData.fullName.trim() : accountData.username.trim()
  };

  dbState.accounts.push(newAccount);
  await persistDatabase();
  return { success: true, account: newAccount };
}

// Khôi phục dữ liệu gốc từ đề bài
export async function resetToDefault() {
  dbState.accounts = [
    { id: 1, username: 'admin', password: '123', fullName: 'Nguyễn Tấn Lực' },
    { id: 2, username: 'sinhvien', password: '123', fullName: 'Sinh Viên FPT' }
  ];
  dbState.students = [
    { id: 1, ten: 'Tran Quang Anh', tuoi: 18 },
    { id: 2, ten: 'Le Thi Lan', tuoi: 19 },
    { id: 3, ten: 'Pham Van Bao', tuoi: 18 }
  ];
  await persistDatabase();
}
