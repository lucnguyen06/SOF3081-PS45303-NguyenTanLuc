import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import QuanLySinhVien from '../views/QuanLySinhVien.vue';
import { authState } from '../utils/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/quan-ly-sinh-vien',
    name: 'QuanLySinhVien',
    component: QuanLySinhVien,
    alias: '/ql-sinh-vien',
    meta: { requiresAuth: true }
  },
  // Fallback về trang chủ nếu gõ sai đường dẫn
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation Guard (Route Guard) bảo vệ tuyến đường Quản lý sinh viên
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = authState.isAuthenticated || localStorage.getItem('isAuthenticated') === 'true';

  if (requiresAuth && !isAuthenticated) {
    // Nếu chưa đăng nhập, chuyển hướng sang trang Login
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    });
  } else {
    // Đã đăng nhập hoặc route không yêu cầu xác thực
    next();
  }
});

export default router;
