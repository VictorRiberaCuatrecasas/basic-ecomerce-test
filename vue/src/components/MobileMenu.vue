<template>
    <div v-if="isMenuOpen" class="bg-background absolute left-0 w-full shadow-md z-50" aria-labelledby="mobile-menu" aria-hidden="false">
        <nav class="container flex flex-col gap-4" aria-label="Mobile Navigation">
            <div class="flex flex-col space-y-2 py-2">
                <a href="/cart" class="text-gray-700 hover:text-gray-900" aria-label="Go to Electronics">Electronics</a>
                <a href="#" class="text-gray-700 hover:text-gray-900" aria-label="Go to Jewelry">Jewelry</a>
                <a href="#" class="text-gray-700 hover:text-gray-900" aria-label="Go to Men's Clothing">Men's Clothing</a>
                <a href="#" class="text-gray-700 hover:text-gray-900" aria-label="Go to Women's Clothing">Women's Clothing</a>
            </div>
            <router-link :to="'/admin'" class="bg-background-darker px-2 mb-4 rounded self-start duration-300 hover:bg-blue-300 cursor-pointer" aria-label="Strapi admin">
                Strapi admin
            </router-link>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isMenuOpen = ref<boolean>(false);

const openMenu = () => {
    isMenuOpen.value = true;
};

const closeMenu = () => {
    isMenuOpen.value = false;
};

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
});

onBeforeUnmount(() => {
    window.removeEventListener('open-menu', openMenu);
    window.removeEventListener('close-menu', closeMenu);
    window.removeEventListener('keydown', handleEscapeKey);
    window.removeEventListener('resize', handleResize);
});
</script>
