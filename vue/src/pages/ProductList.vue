<template>
    <div v-if="isLoading">Loading...</div>
    <div>
        <div v-if="category">
            <h1 class="py-4 uppercase font-bold text-xl">{{ category.name }}</h1>
            <img :src="category.categoryImgUrl" :alt="`banner img for ${category.name}`" />
            <p class="py-4">{{ category.description }}</p>
        </div>
        <div v-if="categorySlug === 'all'">
            <h1 class="py-4 uppercase font-bold text-xl">All products</h1>
            <img src="https://placehold.co/2160x250.png" alt="banner img for all products" />
            <p class="py-4">Description for all products:</p>
        </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
        <!-- Grid Filters -->
        <div class="md:w-80 flex-shrink-0 self-start lg:sticky top-44 bg-gray-100">
            <GridFilters @filter-changed="applyFilters" />
        </div>

        <!-- Product Grid -->
        <div class="flex-grow grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            <ProductCard v-for="(product, index) in paginatedProducts" :key="index" :product="product" />
            <div class="col-span-full">
                <Pagination v-if="totalPages > 1" :currentPage="currentPage" :totalPages="totalPages" @page-changed="onPageChange" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch, Ref } from 'vue';
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
import { fetchCategoryBySlug, fetchStrapiProducts } from '../services/strapiService';
import ProductCard from '../components/ProductCard.vue';
import Pagination from '../components/Pagination.vue';
import GridFilters from '../components/GridFilters.vue';
import { Category, Product } from '../types/all';

const route: RouteLocationNormalizedLoaded = useRoute();

const categorySlug: Ref<string> = ref(route.params.categorySlug as string);
const category: Ref<Category | null> = ref(null);
const isLoading: Ref<boolean> = ref(true);
const error: Ref<string | null> = ref(null);
const products: Ref<Product[]> = ref([]);

// Pagination state
const currentPage: Ref<number> = ref(1);
const itemsPerPage: number = 18;
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

// Filtering state
const filters = ref({ minPrice: 0, maxPrice: 1000, rating: '' });

const filteredProducts = computed(() => {
    return products.value.filter((product) => {
        const withinPriceRange =
            (filters.value.minPrice === 0 || product.price >= filters.value.minPrice) && (filters.value.maxPrice === 0 || product.price <= filters.value.maxPrice);

        const meetsRatingCriteria = !filters.value.rating || product.rating.rate >= Number(filters.value.rating);

        return withinPriceRange && meetsRatingCriteria;
    });
});

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.value.slice(start, end);
});

const loadCategory = async (slug: string): Promise<void> => {
    try {
        isLoading.value = true;
        if (slug === 'all') {
            category.value = null;
            products.value = await fetchStrapiProducts();
        } else {
            const fetchedCategory = await fetchCategoryBySlug(slug);
            if (fetchedCategory) {
                category.value = fetchedCategory;
                products.value = fetchedCategory.products ?? [];
            } else {
                error.value = 'Category not found';
                products.value = [];
            }
        }
    } catch (err: any) {
        error.value = err.message || 'An error occurred';
        products.value = [];
    } finally {
        isLoading.value = false;
    }
};

const applyFilters = (newFilters: { minPrice: number; maxPrice: number; rating: string }) => {
    filters.value = newFilters;
};

const onPageChange = (newPage: number) => {
    currentPage.value = newPage;
};

onMounted(() => {
    loadCategory(categorySlug.value);
});

watch(
    () => route.params.categorySlug,
    (newCategorySlug: string | string[] | undefined) => {
        if (typeof newCategorySlug === 'string') {
            categorySlug.value = newCategorySlug;
            currentPage.value = 1;
            loadCategory(newCategorySlug);
        } else {
            error.value = 'Invalid category slug';
            products.value = [];
        }
    }
);
</script>
