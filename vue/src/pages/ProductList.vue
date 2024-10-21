<template>
  <div>
      <h1>Product List for Category: {{ categoryName }}</h1>
      <!-- Render the list of products here -->
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// Access the route
const route = useRoute();

// Create a reactive variable for categoryName
const categoryName = ref(route.params.categoryName);

// Watch for route changes and update the categoryName
watch(
  () => route.params.categoryName,
  (newCategoryName) => {
      categoryName.value = newCategoryName;
  }
);
</script>

<style scoped>
/* Add your styles here */
</style>
