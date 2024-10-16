vue
<template>
    <nav class="hidden md:flex pt-2 justify-between" aria-label="Product categories">
        <ul class="flex space-x-4">
            <li class="group pb-2">
                <a href="#" class="px-4" aria-label="Electronics category">
                    <span class="pb-2 border-b-2 border-transparent group-hover:border-black transition">Electronics</span>
                </a>
            </li>
            <li class="group pb-2">
                <a href="#" class="px-4" aria-label="Jewelry category">
                    <span class="pb-2 border-b-2 border-transparent group-hover:border-black transition">Jewelry</span>
                </a>
            </li>
            <li class="group pb-2">
                <a href="#" class="px-4" aria-label="Men's Clothing category">
                    <span class="pb-2 border-b-2 border-transparent group-hover:border-black transition">Men's Clothing</span>
                </a>
            </li>
            <li class="group pb-2">
                <a href="#" class="px-4" aria-label="Women's Clothing category">
                    <span class="pb-2 border-b-2 border-transparent group-hover:border-black transition">Women's Clothing</span>
                </a>
            </li>
        </ul>

        <router-link
            :to="'/admin'"
            class="bg-background-darker px-2 rounded self-start duration-300 hover:bg-blue-300 cursor-pointer"
            aria-label="Strapi admin">
            Strapi admin
        </router-link>
    </nav>
</template>

<script></script>
