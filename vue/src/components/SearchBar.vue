<template>
    <div class="max-md:order-4 w-full md:w-auto flex-grow md:mx-4 relative" ref="searchContainer">
        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
            <span class="material-icons">search</span>
        </span>
        <input
            type="text"
            v-model="localSearchQuery"
            @input="handleInput"
            @focus="handleInput"
            placeholder="Search..."
            class="w-full pl-10 p-2 border border-neutral.DEFAULT rounded-full" />
        <span v-if="showResults" @click="closeSearch" class="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2 flex items-center">
            <span class="material-icons">close</span>
        </span>
        <div v-if="showResults" class="absolute left-0 right-0 mt-1 bg-white shadow-md rounded-lg z-10">
            <ul class="max-h-60 overflow-y-auto">
                <li class="p-2 hover:bg-gray-200 cursor-pointer">Example Result 1</li>
                <li class="p-2 hover:bg-gray-200 cursor-pointer">Example Result 2</li>
                <li class="p-2 hover:bg-gray-200 cursor-pointer">Example Result 3</li>
                <li class="p-2 hover:bg-gray-200 cursor-pointer">Example Result 4</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps(['showResults', 'searchQuery']);
const emit = defineEmits(['update:searchQuery', 'toggleResults']);
const searchContainer = ref(null);

const localSearchQuery = ref(props.searchQuery);

watch(
    () => props.searchQuery,
    (newVal) => {
        localSearchQuery.value = newVal;
    }
);

const closeSearch = () => {
    emit('toggleResults', false);
}

const handleInput = () => {
    localSearchQuery.value = localSearchQuery.value.trim();
    const isNotEmpty = localSearchQuery.value.length > 0;
    emit('toggleResults', isNotEmpty);
    emit('update:searchQuery', localSearchQuery.value);
};

const handleClickOutside = (event) => {
    if (searchContainer.value && !searchContainer.value.contains(event.target)) {
        closeSearch();
    }
};

const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
        closeSearch();
    }
};

onMounted(() => {
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleEscapeKey);
});

onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside);
    window.removeEventListener('keydown', handleEscapeKey);
});
</script>

<style scoped></style>
