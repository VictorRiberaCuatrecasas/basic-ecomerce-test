<template>
    <div v-if="isMenuOpen" class="bg-background absolute left-0 w-full shadow-md z-50" aria-labelledby="mobile-menu" aria-hidden="false">
        <nav class="container flex flex-col gap-4" aria-label="Mobile Navigation">
            <ul class="flex flex-col space-y-2 py-2">
                <li v-for="category in categories" :key="category.id" class="group">
                    <router-link :to="`/${category.slug}`" class="text-gray-700 hover:text-gray-900" :aria-label="`Go to ${category.name}`">
                        {{ category.name }}
                    </router-link>
                </li>
                <!-- Hardcoded "All" category -->
                <li class="group">
                    <router-link to="/all" class="text-gray-700 hover:text-gray-900" aria-label="Go to all">All</router-link>
                </li>
            </ul>
            <router-link to="/admin" class="bg-background-darker px-2 mb-4 rounded self-start duration-300 hover:bg-blue-300 cursor-pointer" aria-label="Strapi admin">
                Strapi admin
            </router-link>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { Category } from '../types/all';
import { fetchCategories } from '../services/strapiService';

// State to control the menu and store the categories
const isMenuOpen = ref<boolean>(false);
const categories = ref<Category[]>([]);

const openMenu = () => {
    isMenuOpen.value = true;
};

const closeMenu = () => {
    isMenuOpen.value = false;
};

const loadCategories = async () => {
    const fetchedCategories = await fetchCategories();
    categories.value = fetchedCategories.map((category) => ({
        ...category,
        name: capitalizeName(category.name),
    }));
};

const capitalizeName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const router = useRouter();
router.afterEach(() => {
    window.dispatchEvent(new CustomEvent('close-menu'));
});

const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isMenuOpen.value) {
        window.dispatchEvent(new CustomEvent('close-menu'));
    }
};

const handleResize = () => {
    if (window.innerWidth >= 768) {
        window.dispatchEvent(new CustomEvent('close-menu'));
    }
};

onMounted(() => {
    window.addEventListener('open-menu', openMenu);
    window.addEventListener('close-menu', closeMenu);
    window.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('resize', handleResize);
    handleResize();

    loadCategories();
});

onBeforeUnmount(() => {
    window.removeEventListener('open-menu', openMenu);
    window.removeEventListener('close-menu', closeMenu);
    window.removeEventListener('keydown', handleEscapeKey);
    window.removeEventListener('resize', handleResize);
});
</script>
