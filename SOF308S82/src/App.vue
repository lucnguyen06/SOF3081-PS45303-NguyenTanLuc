<script setup>
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
  
  <h1>AUTHENTICATION</h1>
  <p>
    <strong>Current route path:</strong>{{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Go to Home  -- </RouterLink>
    <RouterLink to="/dashboard">  Go to Dashboard  </RouterLink>
    <RouterLink to="/employee"> --  Employee</RouterLink>
  </nav>
  <main>
    <RouterView/>
  </main>
  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
