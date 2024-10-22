<template>
    <nav class="hidden md:flex pt-2 justify-between" aria-label="Product categories">
        <ul class="flex space-x-4">
            <li v-for="category in categories" :key="category.id" class="group pb-2">
                <router-link :to="`/${category.slug}`" class="px-4" :aria-label="`${category.name} category`">
                    <span class="pb-2 border-b-2 border-transparent group-hover:border-black transition">
                        {{ category.name }}
                    </span>
                </router-link>
            </li>
            <li class="group pb-2">
                <router-link to="/all" class="px-4" aria-label="all">
                    <span class="pb-2 font-semibold border-b-2 border-transparent group-hover:border-black transition">
                        All
                    </span>
                </router-link>
            </li>
        </ul>

        <router-link to="/admin" class="bg-background-darker px-2 rounded self-start duration-300 hover:bg-blue-300 cursor-pointer" aria-label="Strapi admin">
            Strapi admin
        </router-link>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Category } from "../types/all"
import { fetchCategories } from '../services/strapiService';

const categories = ref<Category[]>([]);

const capitalizeName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const loadCategories = async () => {
    const fetchedCategories = await fetchCategories();
    
    categories.value = fetchedCategories.map(category => ({
        ...category,
        name: capitalizeName(category.name),
    }));
};

onMounted(() => {
    loadCategories();
});
</script>
