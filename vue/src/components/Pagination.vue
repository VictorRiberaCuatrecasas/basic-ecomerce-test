<template>
    <div class="flex justify-center py-8">
      <button 
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="rounded px-3 py-2 mx-2 bg-gray-200"
      >
        Prev
      </button>
      
      <span v-for="page in pages" :key="page" class="rounded px-3 py-2" :class="{ 'bg-blue-500 text-white': page === currentPage }" @click="changePage(page)">
        {{ page }}
      </span>
  
      <button 
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="rounded px-3 py-2 mx-2 bg-gray-200"
      >
        Next
      </button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits, computed } from 'vue';
  
  const props = defineProps({
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true },
  });
  
  const emit = defineEmits(['page-changed']);
  
  const pages = computed(() => {
    // You can add logic to restrict the number of pages shown if needed
    return Array.from({ length: props.totalPages }, (_, i) => i + 1);
  });
  
  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= props.totalPages) {
      emit('page-changed', newPage);
    }
  };
  </script>
  