<template>
    <div class="admin-layout">
      <AdminHeader />
      <main>
        <AdminPage />
      </main>
      <AdminFooter />
    </div>
  </template>
  
  <script lang="ts" setup>
  import AdminHeader from "../components/AdminHeader.vue";
  import AdminFooter from "../components/AdminFooter.vue";
  import AdminPage from "../pages/AdminPage.vue";
  </script>
  
  <style scoped>
  .admin-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
  }
  
  main {
    flex: 1;
  }
  </style>
  