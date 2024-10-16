<template>
    <div
        class="group min-w-[280px] snap-center border rounded-lg shadow-md p-4 bg-white flex flex-col justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        aria-labelledby="product-title">
        <!-- Product image -->
        <img :src="product.image" :alt="`Image of ${product.title}`" class="w-full h-48 object-contain rounded-md mb-4 transition-transform duration-300 group-hover:scale-110" />

        <!-- Clickable title as a link to product detail page -->
        <router-link
            :to="`/${product.category}/${product.id}`"
            class="text-base font-medium mb-2 transition-colors duration-300 group-hover:text-blue-500 cursor-pointer hover:underline"
            aria-label="View details for {{ product.title }}"
            id="product-title">
            {{ product.title }}
        </router-link>

        <!-- Product description -->
        <p class="text-gray-700 text-xs mb-4 line-clamp-3" aria-label="Product description">
            {{ product.description }}
        </p>

        <!-- Price and Rating -->
        <div class="flex justify-between items-center mt-auto max-sm:flex-wrap gap-2">
            <div class="w-full flex sm:flex-col justify-between max-sm:items-center">
                <p class="text-base font-bold text-gray-900" aria-label="Price: ${{ product.price }}">${{ product.price }}</p>
                <p class="text-xs text-yellow-500" aria-label="Rating: {{ product.rating.rate }} out of 5, based on {{ product.rating.count }} reviews">
                    Rating: {{ product.rating.rate }} ⭐️ ({{ product.rating.count }})
                </p>
            </div>

            <!-- Add to Basket Button -->
            <button
                class="max-sm:w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition transform hover:scale-105"
                aria-label="Add {{ product.title }} to basket">
                <span class="material-icons">add_shopping_cart</span>
                <span class="sm:hidden">Add to Basket</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
// Define the types for the product prop
import { Product } from '../types/all';

// Define props with TypeScript
const props = defineProps<{
    product: Product;
}>();
</script>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
