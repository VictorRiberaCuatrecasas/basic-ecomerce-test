<template>
    <div class="space-y-12 my-12">
        <div>
            <h2 class="text-xl font-semibold">Electronics</h2>
            <ProductSlider :products="productsByCategory.electronics" :limit="6" />
        </div>
        <div>
            <h2 class="text-xl font-semibold">Jewelery</h2>
            <ProductSlider :products="productsByCategory.jewelery" :limit="6" />
        </div>
        <div>
            <h2 class="text-xl font-semibold">Men's Clothing</h2>
            <ProductSlider :products="productsByCategory['men-clothing']" :limit="6" />
        </div>
        <div>
            <h2 class="text-xl font-semibold">Women's Clothing</h2>
            <ProductSlider :products="productsByCategory['women-clothing']" :limit="6" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProductSlider from '../components/ProductSlider.vue';
import { Product } from '../types/all';

const apiToken = import.meta.env.VITE_STRAPI_API_TOKEN;

const productsByCategory = ref<Record<string, Product[]>>({
  electronics: [],
  jewelery: [],
  'men-clothing': [],
  'women-clothing': [],
});

const categories = [
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Jewelery', slug: 'jewelery' },
    { name: "Men's Clothing", slug: 'men-clothing' },
    { name: "Women's Clothing", slug: 'women-clothing' },
];

const itemCountLimit = 50;
let allProducts: Product[] = [];

const fetchStrapiProducts = async () => {
    try {
        const response = await fetch('http://localhost:1337/api/products?pagination[limit]=400&populate[category]=*&populate[rating]=*', {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch products. Status: ${response.status}`);
        }

        const data = await response.json();

        return data.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            description: item.description,
            category: {
                name: item.category.name,
                slug: item.category.slug,
            },
            image: item.image || '',
            rating: {
                rate: item.rating?.rate || null,
                count: item.rating?.count || null,
            },
        }));
    } catch (error) {
        console.error('Error fetching products from Strapi:', error);
        return [];
    }
};

const seedStrapiWithFakeApi = async (products: Product[]) => {
    for (const product of products) {
        try {
            // Fetch category ID based on the name from Strapi
            const categoryResponse = await fetch(`http://localhost:1337/api/categories?filters[name][$eq]=${product.category}`, {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                },
            });
            const categoryData = await categoryResponse.json();

            if (categoryData.data.length === 0) {
                console.error(`No category found for: ${product.category}`);
                continue;
            }

            const categoryId = categoryData.data[0].id;

            const response = await fetch('http://localhost:1337/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiToken}`,
                },
                body: JSON.stringify({
                    data: {
                        title: product.title,
                        price: product.price,
                        description: product.description,
                        category: categoryId, // Assign category relation by ID
                        image: product.image,
                        rating: {
                            rate: parseInt(product.rating.rate.toString(), 10), // Force int casting
                            count: product.rating.count,
                        },
                        productId: product.id,
                    },
                }),
            });

            const data = await response.json();
            console.log(`Product ${product.title} seeded to Strapi:`, data);
        } catch (error) {
            console.error(`Error seeding product ${product.title} to Strapi:`, error);
        }
    }
};

const fetchFakeApiProducts = async () => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products?limit=${itemCountLimit}`);
        const products: Product[] = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products from Fake API:', error);
        return [];
    }
};

const duplicateProduct = (product: Product): Product => ({
    ...product,
    id: product.id + 1000, // Add 1000 to ensure unique ids for duplicates
    title: `DUPLICATED ${product.title}`,
});

const loadProducts = async () => {
    // Fetch products from Strapi
    let strapiProducts = await fetchStrapiProducts();

    // If no products in Strapi, fetch from Fake API and seed Strapi
    if (strapiProducts.length === 0 || !strapiProducts) {
        const fakeApiProducts = await fetchFakeApiProducts();

        // Add original and duplicated for extra products (api only gives 20)
        fakeApiProducts.forEach((product) => allProducts.push(product, duplicateProduct(product)));
        await seedStrapiWithFakeApi(allProducts);

        strapiProducts = await fetchStrapiProducts();
    }

    allProducts = strapiProducts;

  // Sort products by category slug
  categories.forEach((category) => {
    productsByCategory.value[category.slug] = allProducts.filter(
      (product) => product.category.slug === category.slug
    );
  });
};

onMounted(() => {
    loadProducts();
}); 
</script>

<style scoped></style>
