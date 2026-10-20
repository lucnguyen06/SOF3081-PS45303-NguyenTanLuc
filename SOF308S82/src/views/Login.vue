<!-- src/views/Login.vue -->
<template>
    <div>
        <h1>Login Page</h1>
        <button @click="login">Login</button>
    </div>
</template>
<script>
  export default{
    name: 'Login',
    methods: {
        login(){
            // Implement login logic here
            // For example, set 'isAuthenticated' to true and redirect to dashboard
            this.$router.push({name: 'Dashboard'});
        }
    }
  };
</script>