<template>
    <div class="p-4 bg-gray-100 shadow-md">
      <!-- Filters Header -->
      <h2 class="text-lg font-bold mb-4">Filters</h2>
  
      <!-- Filter by price (min/max inputs) -->
      <div class="mb-4">
        <label class="block font-bold mb-2">Price</label>
        <div class="flex space-x-2">
          <input v-model.number="minPrice" type="number" placeholder="Min" class="w-full p-2 border rounded" />
          <input v-model.number="maxPrice" type="number" placeholder="Max" class="w-full p-2 border rounded" />
        </div>
        <span class="text-sm text-gray-600">Price Range: {{ minPrice }} - {{ maxPrice }}</span>
      </div>
  
      <!-- Filter by rating -->
      <div class="mb-4">
        <label class="block font-bold mb-2">Rating</label>
        <select v-model="rating" class="w-full p-2 border rounded">
          <option value="">All Ratings</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2+ Stars</option>
          <option value="1">1+ Stars</option>
        </select>
      </div>
  
      <!-- Apply Filters Button -->
      <button @click="applyFilters" class="bg-blue-500 text-white px-4 py-2 rounded w-full">Apply Filters</button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineEmits } from 'vue';
  
  const emits = defineEmits(['filter-changed']);
  
  const minPrice = ref<number>(0);
  const maxPrice = ref<number>(1000);
  const rating = ref<string | null>('');
  
  // Emit filter changes to parent
  const applyFilters = () => {
    emits('filter-changed', { minPrice: minPrice.value, maxPrice: maxPrice.value, rating: rating.value });
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles if needed */
  </style>
  