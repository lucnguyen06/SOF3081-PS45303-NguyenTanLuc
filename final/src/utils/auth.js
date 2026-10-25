import { reactive } from 'vue';
import { checkCredentials, registerAccount } from './dbService';

// Khởi tạo trạng thái xác thực từ localStorage
const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
const storedUser = localStorage.getItem('currentUser') || '';

export const authState = reactive({
  isAuthenticated: storedAuth,
  username: storedUser
});

/**
 * Đăng nhập: Kiểm tra tài khoản trong danh sách accounts của db.json
 */
export function login(username, password) {
  const account = checkCredentials(username, password);
  if (account) {
    authState.isAuthenticated = true;
    authState.username = account.fullName || account.username;
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', authState.username);
    return { success: true, user: account };
  }

  // Nếu tài khoản nhập vào không trùng khớp trong db.json
  return {
    success: false,
    message: 'Tài khoản hoặc mật khẩu không đúng! (Xem danh sách tài khoản hợp lệ bên dưới)'
  };
}

/**
 * Đăng ký tài khoản mới và lưu trực tiếp vào db.json
 */
export async function register(accountData) {
  return await registerAccount(accountData);
}

/**
 * Đăng xuất
 */
export function logout() {
  authState.isAuthenticated = false;
  authState.username = '';
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('currentUser');
}
