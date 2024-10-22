<template>
    <div class="space-y-12 my-12">
        <div>
            <h2 class="text-xl font-semibold">Electronics</h2>
            <ProductSlider :products="productsByCategory.electronics" :limit="6" />
        </div>
        <div>
            <h2 class="text-xl font-semibold">Jewelery</h2>
            <ProductSlider :products="productsByCategory.jewelery" :limit="6" />
        </div>
        <div>
            <h2 class="text-xl font-semibold">Men's Clothing</h2>
            <ProductSlider :products="productsByCategory['men-clothing']" :limit="6" />
        </div>
        <div>
            <h2 class="text-xl font-semibold">Women's Clothing</h2>
            <ProductSlider :products="productsByCategory['women-clothing']" :limit="6" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProductSlider from '../components/ProductSlider.vue';
import { loadProducts } from '../services/strapiService';
import { Product } from '../types/all';

const productsByCategory = ref<Record<string, Product[]>>({
  electronics: [],
  jewelery: [],
  'men-clothing': [],
  'women-clothing': [],
});

const categories = [
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Jewelery', slug: 'jewelery' },
    { name: "Men's Clothing", slug: 'men-clothing' },
    { name: "Women's Clothing", slug: 'women-clothing' },
];

const loadAndCategorizeProducts = async () => {
    const allProducts = await loadProducts();

    categories.forEach((category) => {
        productsByCategory.value[category.slug] = allProducts.filter(
            (product) => product.category.slug === category.slug
        );
    });
};

onMounted(() => {
    loadAndCategorizeProducts();
});
</script>
