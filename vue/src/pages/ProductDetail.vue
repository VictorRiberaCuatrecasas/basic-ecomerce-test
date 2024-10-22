<template>
    <div class="container mx-auto p-6">
        <div v-if="product" class="flex flex-col md:flex-row gap-6">
            <div class="max-md:order-2 w-full md:w-3/5 flex flex-col gap-6">
                <!-- Product Image -->
                <div class="w-full border border-gray-200 p-4 rounded-lg">
                    <img :src="product.image || 'https://via.placeholder.com/400'" alt="Product Image" class="w-full max-w-xs mx-auto h-auto object-cover rounded-lg" />
                </div>
                <!-- Product Description -->
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-lg font-semibold mb-2">Product Description</h3>
                    <p class="text-gray-700">{{ product.description }}</p>
                </div>

                <!-- Decorative Placeholder Blocks -->
                <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-blue-100 h-32 rounded-lg flex items-center justify-center">
                        <p class="text-blue-800 text-lg">Decorative Block 1</p>
                    </div>
                    <div class="bg-green-100 h-60 rounded-lg flex items-center justify-center">
                        <p class="text-green-800 text-lg">Decorative Block 2</p>
                    </div>
                    <div class="bg-pink-100 h-80 rounded-lg flex items-center justify-center">
                        <p class="text-pink-800 text-lg">Decorative Block 3</p>
                    </div>

                    <div class="bg-pink-100 h-80 rounded-lg flex items-center justify-center">
                        <p class="text-pink-800 text-lg">Decorative Block 3</p>
                    </div>

                    <div class="bg-green-100 h-60 rounded-lg flex items-center justify-center">
                        <p class="text-green-800 text-lg">Decorative Block 2</p>
                    </div>
                    <div class="bg-blue-100 h-80 rounded-lg flex items-center justify-center">
                        <p class="text-blue-800 text-lg">Decorative Block 1</p>
                    </div>
                </div>
            </div>
            <div class="w-full max-md:order-1 md:w-2/5">
                <div class="p-6 sticky top-40 bg-white border border-gray-200 rounded-lg shadow-md">
                    <!-- Product Title and Price -->
                    <div>
                        <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ product.title }}</h1>
                        <p class="text-gray-400 text-sm mb-2">Product ID: {{ product.id }}</p>
                        <div class="flex items-center mb-4">
                            <p class="text-2xl font-semibold text-green-600 mr-2">€ {{ product.price }}</p>
                            <p class="text-sm line-through text-gray-500">€ {{ originalPrice }}</p>
                        </div>
                    </div>
                    <!-- Specifications -->
                    <div class="mt-4 mb-6 border-t pt-4">
                        <h3 class="text-lg font-semibold mb-3 text-gray-800">Specifications</h3>
                        <ul class="text-gray-700 space-y-2">
                            <li>
                                <span class="font-medium">Product ID:</span>
                                {{ product.id }}
                            </li>
                            <li>
                                <span class="font-medium">Category:</span>
                                {{ product.category.name }}
                            </li>
                            <li>
                                <span class="font-medium">Price:</span>
                                € {{ product.price }}
                            </li>
                        </ul>
                    </div>
                    <!-- Product Rating -->
                    <div class="my-6">
                        <h2 class="text-lg font-semibold text-gray-800 mb-1">Rating: {{ product.rating.rate }} / 5</h2>
                        <p class="text-gray-500">{{ product.rating.count }} Reviews</p>
                    </div>
                    <!-- Add to Cart Button -->
                    <button
                        class="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
        <div class="bg-gray-100 flex items-center justify-center h-[400px] my-8"> other stuff </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchProductByProductId } from '../services/strapiService';
import { Product } from '../types/all';

const route = useRoute();
const productId = route.params.productId;
const product = ref<Product | null>(null);
const originalPrice = ref(0);

// Fetch product details based on productId
onMounted(async () => {
    const fetchedProduct = await fetchProductByProductId(Number(productId));

    if (fetchedProduct) {
        product.value = fetchedProduct;
        originalPrice.value = fetchedProduct.price * 1.25; // Assume 25% higher original price, can be adjusted
    }
});
</script>
