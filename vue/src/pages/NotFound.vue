<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="text-center">
            <h1 class="text-6xl font-bold text-gray-800">404</h1>
            <p class="mt-4 text-lg text-gray-600">Oops! Page not found.</p>
            <p class="mt-2 text-gray-500">The page you're looking for doesn't exist.</p>
            <router-link
                to="/"
                class="mt-6 inline-block px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                @click.prevent="redirectHome"
                aria-label="Go back to home page">
                Go Back Home
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const redirectHome = (): void => {
    const currentPath = router.currentRoute.value.path;

    if (currentPath.startsWith('/admin')) {
        router.push('/admin');
    } else {
        router.push('/');
    }
};
</script>

<style scoped></style>
