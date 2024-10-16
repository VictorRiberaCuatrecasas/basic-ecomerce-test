<template>
  <div>
    <h1>
      Product Detail for Item: {{ itemId }} in Category: {{ categoryName }}
    </h1>
    <!-- Render the product details here -->
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

// Access the route
const route = useRoute();

// Get the parameters from the route
const categoryName = route.params.categoryName;
const itemId = route.params.itemId;
</script>

<style scoped>
/* Add your styles here */
</style>
