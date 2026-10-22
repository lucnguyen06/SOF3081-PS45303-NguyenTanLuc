import { ref } from 'vue';

const getInitialAuthState = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const authState = ref({
  isAuthenticated: getInitialAuthState(),
  user: {
    username: 'nguyentanluc',
    name: 'Nguyễn Tấn Lực',
    studentId: 'PS45303',
    email: 'lucntps45303@fpt.edu.vn',
    role: 'Sinh viên FPT Polytechnic',
    bio: 'Đam mê lập trình Vue.js và phát triển các ứng dụng Web hiện đại.',
    phone: '0901234567',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    joinedDate: '20/10/2026',
    emailNotifications: true,
    darkMode: false,
    profileVisibility: 'public'
  }
});

export function login(username, password) {
  // Giả lập xác thực đăng nhập thành công
  localStorage.setItem('isAuthenticated', 'true');
  authState.value.isAuthenticated = true;
  return true;
}

export function logout() {
  localStorage.removeItem('isAuthenticated');
  authState.value.isAuthenticated = false;
}
