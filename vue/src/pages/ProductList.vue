<template>
  <div>
    <h1>Product List for Category: {{ categoryName }}</h1>
    <!-- Render the list of products here -->
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

// Access the route
const route = useRoute();

// Get the categoryId from the route parameters
const categoryName = route.params.categoryName;
</script>

<style scoped>
/* Add your styles here */
</style>
