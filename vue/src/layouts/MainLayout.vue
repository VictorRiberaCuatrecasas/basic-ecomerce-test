<template>
    <div class="main-layout">
        <Header />
        <main class="container">
            <router-view />
        </main>
        <Footer />
    </div>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
</script>

<style scoped>
.main-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

main {
    flex: 1;
}
</style>
