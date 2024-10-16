<template>
    <button @click="handleClick" class="md:hidden flex items-center" aria-label="Toggle menu" :aria-expanded="isMenuOpen">
        <span class="material-icons transition-transform duration-300" :class="isMenuOpen ? 'rotate-360' : ''">
            {{ isMenuOpen ? 'no_food' : 'fastfood' }}
        </span>
    </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isMenuOpen = ref(false);

const handleClick = () => {
    if (isMenuOpen.value) {
        window.dispatchEvent(new CustomEvent('close-menu'));
    } else {
        window.dispatchEvent(new CustomEvent('open-menu'));
    }
};

// Update the local state based on global events
const openMenu = () => {
    isMenuOpen.value = true;
};

const closeMenu = () => {
    isMenuOpen.value = false;
};

// Add event listeners for opening and closing the menu
onMounted(() => {
    window.addEventListener('open-menu', openMenu);
    window.addEventListener('close-menu', closeMenu);
});

onBeforeUnmount(() => {
    window.removeEventListener('open-menu', openMenu);
    window.removeEventListener('close-menu', closeMenu);
});
</script>

<style scoped>
.rotate-360 {
    transform: rotate(360deg);
}
</style>
