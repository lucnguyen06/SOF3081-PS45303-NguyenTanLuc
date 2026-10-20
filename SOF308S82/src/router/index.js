//router/index.js
import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Dangnhap.vue';
import Employee from '../views/Employee.vue';

const routes = [
    { path: '/', name:'Home', component: Home},
    { path: '/login', name: 'Login', component: Login},
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, 
      meta: { requiresAuth: true } }, // this route requires authentication 
    { path: '/employee', name: 'Employee', component: Employee,
      meta: { requiresAuth: true }    // this route requires authentication 
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

//Navigation Guard
router.beforeEach((to, from, next) => {
    
    const token = localStorage.getItem('loginData'); // check if a token exist
    if(to.matched.some(record => record.meta.requiresAuth) && !token){
        next({ name: 'Login'});// Redirect to the Login page if not login
    }else{
        next();//Proceed to the route
    }

    /*
    const isAuthenticated = false; // Replace with actual anthentication check
    if(to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated){
        next({ name: 'Login'});// Redirect to the Login page if not login
    }else{
        next();//Proceed to the route
    }
*/
});

export default router