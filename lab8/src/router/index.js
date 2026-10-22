import { createRouter, createWebHistory } from 'vue-router';

// 1. Import các components từ thư mục views
import Home from '../views/Home.vue';
import BlogList from '../views/BlogList.vue';
import BlogPost from '../views/BlogPost.vue';
import UserProfile from '../views/UserProfile.vue';
import UserInfo from '../views/UserInfo.vue';
import UserSettings from '../views/UserSettings.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';

// 2. Định nghĩa danh sách routes theo yêu cầu Lab 8
const routes = [
  // Yêu cầu 2: Trang chủ Home
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // Yêu cầu 2: Trang danh sách blog
  {
    path: '/blog',
    name: 'BlogList',
    component: BlogList
  },
  // Yêu cầu 3b: Routes động với tham số :id
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: BlogPost,
    props: true
  },
  // Yêu cầu 3a & 3e: Routes lồng nhau (nested routes) và Alias Route (/me)
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    alias: '/me', // Yêu cầu 3e: Alias route cho /profile
    children: [
      {
        path: '',
        redirect: { name: 'UserInfo' }
      },
      {
        path: 'info',
        name: 'UserInfo',
        component: UserInfo
      },
      {
        path: 'settings',
        name: 'UserSettings',
        component: UserSettings
      }
    ]
  },
  // Yêu cầu 2: Trang đăng nhập
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // Yêu cầu 3c: Route được bảo vệ với xác thực giả lập
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true } // Đánh dấu route yêu cầu đăng nhập
  },
  // Route fallback khi không khớp
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
];

// Khởi tạo router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Tự động cuộn lên đầu trang khi chuyển route
    return { top: 0 };
  }
});

// Yêu cầu 3c: Navigation Guard bảo vệ route với xác thực giả lập
router.beforeEach((to, from, next) => {
  // Lấy biến isAuthenticated từ localStorage để giả lập trạng thái đăng nhập
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Kiểm tra xem route đích (hoặc cha của nó) có yêu cầu xác thực không
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // Nếu chưa được xác thực, chuyển hướng đến trang Login
      next({
        name: 'Login',
        query: { redirect: to.fullPath }
      });
    } else {
      next(); // Đã xác thực, cho phép truy cập
    }
  } else {
    next(); // Tuyến đường công khai, cho phép truy cập bình thường
  }
});

export default router;
