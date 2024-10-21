<template>
    <div class="flex justify-center items-center bg-background-darker py-2 text-center">
        <div class="container">
          <!-- TODO: refactor and fuse mobile and desktop - requires fancier animation and setup -->
            <!-- Desktop View: USP List -->
            <div class="max-md:hidden flex justify-between">
                <div v-for="(usp, index) in usps" :key="index" class="flex items-center">
                    <span class="material-icons mr-1 !text-[18px] text-gray-600" aria-hidden="true">{{ getIcon(index) }}</span>
                    <span class="text-sm">{{ usp }}</span>
                </div>
            </div>

            <!-- Mobile View: Cycling USP -->
            <div v-if="visibleUSP" key="usp" class="md:hidden flex items-center justify-center">
                <span class="material-icons text-sm mr-1" aria-hidden="true">{{ getIcon(currentUSPIndex) }}</span>
                <span class="text-sm" aria-live="polite">{{ visibleUSP }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const usps: string[] = ['Free Shipping on Orders Over $50', '30-Day Money-Back Guarantee', '24/7 Customer Support'];

const icons: string[] = [
    'rocket_launch', // Free Shipping
    'attach_money', // Money-Back Guarantee
    'support_agent', // Customer Support
];

const visibleUSP = ref<string>(usps[0]);
let currentUSPIndex: number = 0;
let interval: ReturnType<typeof setInterval> | null = null;

const cycleUSP = () => {
    currentUSPIndex = (currentUSPIndex + 1) % usps.length;
    visibleUSP.value = usps[currentUSPIndex];
};

const getIcon = (index: number): string => icons[index];

onMounted(() => {
    interval = setInterval(cycleUSP, 3000);
});

onBeforeUnmount(() => {
    if (interval) clearInterval(interval);
});
</script>

<style scoped>

</style>
