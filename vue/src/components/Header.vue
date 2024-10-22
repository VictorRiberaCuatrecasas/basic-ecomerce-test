<template>
    <header class="bg-background shadow-md sticky top-0 left-0 w-full z-50" aria-label="Main Navigation">
        <USPRow />

        <div class="container flex flex-col">
            <div class="flex flex-wrap justify-between items-center gap-4 md:gap-12 py-4">
                <!-- Hamburger Menu -->
                <HamburgerMenu />

                <!-- Logo -->
                <Logo />

                <!-- Search Bar -->
                <SearchBar
                    :searchQuery="searchQuery"
                    :showResults="showResults"
                    @toggleResults="setShowResults"
                    @update:searchQuery="searchQuery = $event"
                    aria-label="Search Bar" />

                <!-- Login and Cart Icons -->
                <UserActions />
            </div>

            <!-- TODO: couple categorynav and mobile menu, not done for styling convenience -->
            <CategoryNav />
        </div>
        <MobileMenu />
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HamburgerMenu from './HamburgerMenu.vue';
import Logo from './Logo.vue';
import SearchBar from './SearchBar.vue';
import UserActions from './UserActions.vue';
import CategoryNav from './CategoryNav.vue';
import MobileMenu from './MobileMenu.vue';
import USPRow from './USPRow.vue';

const searchQuery = ref<string>('');
const showResults = ref<boolean>(false);

const setShowResults = (value: boolean) => {
    showResults.value = value;
};
</script>

<style scoped>
.rotate-360 {
    transform: rotate(360deg);
}
</style>
