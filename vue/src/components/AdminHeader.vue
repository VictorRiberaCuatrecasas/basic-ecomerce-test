<template>
    <div class="flex justify-between items-center bg-red-300 p-4">
      <h1>Admin header - Strapi iframe</h1>
      <button class="bg-green-300 p-2 rounded" @click="goToHome">Back to home</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const goToHome = () => {
    router.push('/');
  };
  </script>
  
  <style scoped>
  </style>
  