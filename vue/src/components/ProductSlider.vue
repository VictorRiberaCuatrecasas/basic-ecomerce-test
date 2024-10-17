<template>
    <div class="relative">
        <!-- Left Arrow -->
        <button
            v-if="limitedProducts && limitedProducts.length"
            class="absolute flex z-50 left-0 md:-left-8 top-1/2 transform -translate-y-1/2 bg-background-darker bg-opacity-80 p-3 rounded-full shadow-md transition-opacity duration-200"
            :disabled="isAtStart"
            @click="scrollLeft"
            :class="{ hidden: !limitedProducts || !limitedProducts.length }"
            aria-label="Scroll left">
            <i class="material-icons">chevron_left</i>
        </button>

        <!-- Slider -->
        <div class="overflow-x-auto px-4 pt-4 pb-12 product-slider scroll-smooth snap-x snap-mandatory" ref="slider" @scroll="checkScroll" aria-label="Product slider">
            <div class="flex space-x-4">
                <ProductCard v-for="(product, index) in limitedProducts" :key="index" :product="product" />
                <!-- little hack for shadow visuals, cant use overflow-x and y at the same time so hack is in order -->
                <div>&nbsp;</div>
            </div>
        </div>

        <!-- Right Arrow -->
        <button
            v-if="limitedProducts && limitedProducts.length"
            class="absolute z-50 flex right-0 md:-right-8 top-1/2 transform -translate-y-1/2 bg-background-darker bg-opacity-80 p-3 rounded-full shadow-md transition-opacity duration-200"
            :disabled="isAtEnd"
            @click="scrollRight"
            :class="{ hidden: !limitedProducts || !limitedProducts.length }"
            aria-label="Scroll right">
            <i class="material-icons">chevron_right</i>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount, nextTick, computed } from 'vue';
import ProductCard from './ProductCard.vue';
import { Product } from '../types/all.ts';

const props = defineProps({
    products: {
        type: Array as () => Product[],
        required: true,
    },
    limit: {
        type: Number,
        required: true,
        default: 8,
    },
});

const slider = ref<HTMLElement | null>(null);
const isAtStart = ref<boolean>(true);
const isAtEnd = ref<boolean>(false);

const limitedProducts = computed(() => {
    return props.products.slice(0, props.limit);
});

const checkScroll = () => {
    if (slider.value) {
        const scrollLeft = Math.ceil(slider.value.scrollLeft);
        const maxScrollLeft = slider.value.scrollWidth - slider.value.clientWidth;

        isAtStart.value = scrollLeft <= 1;
        isAtEnd.value = scrollLeft >= maxScrollLeft - 1;
    }
};

// Scroll the slider to the left
const scrollLeft = () => {
    slider.value?.scrollBy({ left: -300, behavior: 'smooth' });
};

// Scroll the slider to the right
const scrollRight = () => {
    slider.value?.scrollBy({ left: 300, behavior: 'smooth' });
};

//TODO: fix timeouthack for scrolling buttons
onMounted(() => {
    window.addEventListener('resize', checkScroll);
    nextTick(() => {
        setTimeout(() => {
            checkScroll();
        }, 500);
    });
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScroll);
});

watch(
    () => props.products,
    () => {
        checkScroll();
    }
);
</script>

<style scoped>
.product-slider::-webkit-scrollbar {
    display: none;
}

.product-slider {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.snap-x {
    scroll-snap-type: x mandatory;
}

.snap-center {
    scroll-snap-align: center;
}

button[disabled] {
    display: none;
}
</style>
