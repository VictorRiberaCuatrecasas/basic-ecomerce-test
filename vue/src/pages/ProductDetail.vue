<template>
  <div>
    <h1>Product Detail for Item: {{ productId }} in Category: {{ categorySlug }}</h1>
    <!-- Render the product details here -->
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const categorySlug = route.params.categorySlug;
const productId = route.params.productId;

// Fetch product details from Strapi or your service using these parameters
</script>
