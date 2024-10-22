import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';
import Home from '../pages/HomePage.vue';
import Cart from '../pages/CartPage.vue';
import Checkout from '../pages/CheckoutPage.vue';
import ProductDetail from '../pages/ProductDetail.vue';
import ProductList from '../pages/ProductList.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import NotFound from '../pages/NotFound.vue';
import { fetchCategorySlugs, fetchProductIds } from '../services/strapiService';

let validCategories: string[] = ['all']; //Allow for hardcoded categories
let validItemIds: string[] = [];

let isValidCategory = (categorySlug: string): boolean => validCategories.includes(categorySlug);
let isValidItemId = (itemId: string): boolean => validItemIds.includes(itemId);

const redirectTo404 = (path: string) => {
    return path.startsWith('/admin') ? '/admin/404' : '/404';
};

// Routes setup
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: MainLayout,
        children: [
            { path: '', component: Home },
            { path: 'cart', component: Cart },
            { path: 'checkout', component: Checkout },
            { path: ':categorySlug', component: ProductList },
            { path: ':categorySlug/:productId', component: ProductDetail },
            { path: '404', component: NotFound },
        ],
    },
    {
        path: '/admin',
        component: AdminLayout,
        children: [
            { path: '', component: Home },
            { path: 'cart', component: Cart },
            { path: 'checkout', component: Checkout },
            { path: ':categorySlug', component: ProductList },
            { path: ':categorySlug/:itemId', component: ProductDetail },
            { path: '404', component: NotFound },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: (to) => redirectTo404(to.path),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export const initializeRouter = async () => {
    const fetchedCategories = await fetchCategorySlugs();
    validCategories = [...validCategories, ...fetchedCategories];

    const fetchedItemIds = await fetchProductIds();
    validItemIds = [...validItemIds, ...fetchedItemIds];

    // Add navigation guard
    router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
        const { categorySlug, productId } = to.params as { categorySlug?: string; productId?: string };

        if (categorySlug && !isValidCategory(categorySlug)) {
            return next(redirectTo404(to.path));
        }

        if (productId && !isValidItemId(productId)) {
            return next(redirectTo404(to.path));
        }

        next();
    });
};

export default router;
